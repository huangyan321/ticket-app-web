/** @format */

import { Sequelize, DataTypes, PoolOptions } from 'sequelize';
import config from '@/config/index';
class Db {
  sequelize: Sequelize;
  constructor(configs: {
    dbName: string;
    host: string;
    port: number;
    user: string;
    password: string;
    pool: PoolOptions;
    logging: boolean;
    dialectOptions: object;
    [params: string]: any;
  }) {
    const {
      dbName,
      host,
      port,
      user,
      password,
      pool,
      logging = false,
      dialectOptions,
    } = configs;
    this.sequelize = new Sequelize(dbName, user, password, {
      host,
      dialect: 'mysql',
      pool,
      //是否开启日志
      logging,
      dialectOptions,
      define: {
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        underscored: true,
        scopes: {
          bh: {
            attributes: {
              exclude: ['password', 'updated_at', 'deleted_at', 'is_deleted'],
            },
          },
          iv: {
            attributes: {
              exclude: ['content', 'password', 'updated_at', 'deleted_at'],
            },
          },
        },
      },
    });
  }
  async connect() {
    try {
      await this.sequelize.authenticate();
      console.log('Sequelize connection has been established successfully.');
    } catch (error) {
      console.error('Sequelize unable to connect to the database:', error);
    }
  }
  async close() {
    await this.sequelize.close();
  }
  async sync() {
    await this.sequelize.sync({ force: false });
  }
  async defineModel(name: string, attributes: any) {
    const attrs: any = {};
    for (let key in attributes) {
      let val = attributes[key];
      if (typeof val === 'object' && val['type']) {
        val.allowNull = val.allowNull || false;
        attrs[key] = val;
      } else {
        attrs[key] = {
          type: val,
          allowNull: false,
        };
      }
    }
    // attrs.is_deleted = {
    //   type: DataTypes.BOOLEAN,
    //   defaultValue: 0,
    //   allowNull: false,
    // };
    return this.sequelize.define(name, attrs, {
      tableName: name,
      timestamps: true,
    });
  }
}
export default new Db(config.database);
