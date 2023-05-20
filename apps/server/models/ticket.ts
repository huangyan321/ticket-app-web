/** @format */

import orm from '@/core/db';
import { DataTypes } from 'sequelize';
export default () => {
  return orm.defineModel('x_ticket', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      comment: '消费券主键ID',
    },
    create_user_id: {
      type: DataTypes.INTEGER,
      // 备注
      comment: '创建者',
    },
    dis_reason: DataTypes.STRING(200),
    custom_img: DataTypes.STRING(200),
    type: {
      type: DataTypes.TINYINT,
      comment:
        '消费券类型:1-蓝色 消气券 ,2 -黄色 去玩券，3 - 白的 煮饭券 4- 礼物券',
    },
    is_invalid: {
      type: DataTypes.TINYINT,
      comment: '是否作废:0-否,1-是',
    },
    is_applying: {
      type: DataTypes.TINYINT,
      // 备注
      comment: '是否在申请中:0-否,1-是',
    },
    is_used: {
      type: DataTypes.TINYINT,
      // 备注
      comment: '是否已使用:0-否,1-是',
    },
  });
};
