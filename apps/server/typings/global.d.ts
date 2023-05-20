/** @format */

declare var global: {
  $config: {
    environment: string;
    database: {
      dbName: string;
      host: string;
      port: number;
      user: string;
      password: string;
    };
    security: {
      secretKey: string;
      expiresIn: number;
    };
  };
  $error: any;
};
