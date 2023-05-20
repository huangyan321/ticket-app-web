/** @format */

import orm from '@/core/db';
import { DataTypes } from 'sequelize';
export default () => {
  return orm.defineModel('x_role', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      comment: '角色主键ID',
    },
    permission: {
      type: DataTypes.INTEGER,
      comment: '用户角色:1-超级管理员，2-生产者，3-消费者',
    },
  });
};
