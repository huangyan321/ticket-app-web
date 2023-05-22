/** @format */

import orm from '@/core/db';
import { DataTypes } from 'sequelize';
import moment from 'moment';
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
    dis_reason: {
      type: DataTypes.STRING(200),
      allowNull: true,
      comment: '分配理由',
    },
    custom_img: {
      type: DataTypes.STRING(200),
      allowNull: true,
      comment: '自定义头像',
    },
    type: {
      type: DataTypes.TINYINT,
      comment:
        '消费券类型:1-蓝色 消气券 ,2 -黄色 去玩券，3 - 白的 煮饭券 4- 礼物券',
    },
    is_invalid: {
      type: DataTypes.TINYINT,
      allowNull: true,
      comment: '是否作废:0-否,1-是',
    },
    is_applying: {
      type: DataTypes.TINYINT,
      // 备注
      allowNull: true,
      comment: '是否在申请中:0-否,1-是',
    },
    is_rejected: {
      type: DataTypes.TINYINT,
      // 备注
      allowNull: true,
      comment: '是否已拒绝:0-否,1-是',
    },
    apply_date: {
      type: DataTypes.DATE,
      // 备注
      allowNull: true,
      comment: '申请时间',
      get(): any {
        // @ts-ignore
        return moment(this.getDataValue('apply_date')).format(
          'YYYY-MM-DD HH:mm:ss'
        );
      },
    },
    used_date: {
      type: DataTypes.DATE,
      // 备注
      allowNull: true,
      comment: '已使用时间',
      get(): any {
        // @ts-ignore
        return moment(this.getDataValue('used_date')).format(
          'YYYY-MM-DD HH:mm:ss'
        );
      },
    },
    is_used: {
      type: DataTypes.TINYINT,
      // 备注
      allowNull: true,
      comment: '是否已使用:0-否,1-是',
    },
    created_at: {
      type: DataTypes.DATE,
      comment: '创建时间',
      get(): any {
        // @ts-ignore
        return moment(this.getDataValue('created_at')).format(
          'YYYY-MM-DD HH:mm:ss'
        );
      },
    },
  });
};
