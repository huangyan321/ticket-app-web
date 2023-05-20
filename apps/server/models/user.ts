/** @format */

import orm from '@/core/db';
import { DataTypes } from 'sequelize';
export default () => {
  return orm.defineModel('x_user', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      comment: '用户主键ID',
    },
    username: {
      type: DataTypes.STRING(50),
      // 备注
      comment: '用户昵称',
    },
    password: {
      type: DataTypes.STRING(50),
      comment: '用户密码',
    },
    role: {
      type: DataTypes.INTEGER,
      comment: '用户角色:1-超级管理员，2-生产者，3-消费者',
    },
  });
};
