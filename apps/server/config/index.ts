/** @format */

const configs = {
  environment: 'dev',
  database: {
    dbName: 'promise_db',
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    logging: false,
    dialectOptions: {
      dateStrings: true,
      typeCast: true,
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  security: {
    secretKey: 'secretKey',
    // 过期时间 1小时
    expiresIn: 60 * 60,
  },
};
export default configs;
