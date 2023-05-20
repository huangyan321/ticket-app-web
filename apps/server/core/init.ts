/** @format */

import Router from 'koa-router';
import requireDir from 'require-directory';
import * as model from '@/models/index';
import type Application from 'koa';
class InitManager {
  static app: Application;
  static initCore(app: Application) {
    InitManager.app = app;
    this.initDb();
    this.loadRouters();
    this.loadConfigs();
    this.loadHttpException();
  }
  static initDb() {
    model.init();
  }
  static loadRouters() {
    const apiDirectory = `${process.cwd()}/app/apis`;
    // 自动加载路由
    requireDir(module, apiDirectory, {
      visit: whenLoadModule,
      extensions: ['ts'],
    });
    function whenLoadModule(obj: { router: Router }) {
      //
      if (obj.router instanceof Router) {
        InitManager.app.use(obj.router.routes());
      }
    }
  }
  static async loadConfigs() {
    const configPath = process.cwd() + '/config/index.ts';
    const config = await import(configPath);
    global.$config = config.default;
  }
  static async loadHttpException() {
    const errors = (await import('./http-exception')) as any;

    global.$error = errors;
  }
}
export default InitManager;
