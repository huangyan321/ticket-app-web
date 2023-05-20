/** @format */

import type { ModelStatic } from 'sequelize';
import db from '@/core/db';
import defineRole from './role';
import defineTicket from './ticket';
import defineUser from './user';
let modelsMap: any = {};
const format = (res: ModelStatic<any>[]) => {
  const tableMap: any = {};
  for (let key in res) {
    tableMap[res[key].tableName] = res[key];
  }
  return tableMap;
};
async function registerAllModels() {
  console.log('测试数据库连接');

  await db.connect().catch((err) => {
    console.log(err);
  });

  const res: ModelStatic<any>[] = await Promise.all([
    defineRole(),
    defineTicket(),
    defineUser(),
  ]);

  console.log('模型同步中');

  await db.sync();

  console.log('模型均已同步');

  return format(res);
}
export async function init() {
  modelsMap = await registerAllModels();
}
export function getModel(key: string): ModelStatic<any> {
  console.log(modelsMap);

  return modelsMap[key];
}
