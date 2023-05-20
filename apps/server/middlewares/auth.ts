/** @format */

import basicAuth from 'basic-auth';
import jwt from 'jsonwebtoken';
import type { Context, Next } from 'koa';
class Auth {
  level: number;
  static CONSUMER: number;
  static PRODUCER: number;
  static SUPER_ADMIN: number;
  constructor(level?: number) {
    this.level = level || 1;

    Auth.CONSUMER = 8;
    Auth.PRODUCER = 16;
    Auth.SUPER_ADMIN = 32;
  }

  get m() {
    // token 检测
    // token 开发者 传递令牌
    // token body header
    // HTTP 规定 身份验证机制 HttpBasicAuth
    return async (ctx: Context, next: Next) => {
      // const tokenToken = basicAuth(ctx.req);
      const tokenToken = {
        name: (ctx.req.headers as any).token as string,
      };
      let errMsg = '无效的token';
      // 无带token
      if (!tokenToken || !tokenToken.name) {
        errMsg = '需要携带token值';
        throw new global.$error.Forbidden(errMsg);
      }

      try {
        var decode: any = jwt.verify(
          tokenToken.name,
          global.$config.security.secretKey
        );
      } catch (error: any) {
        // token 不合法 过期
        if (error.name === 'TokenExpiredError') {
          errMsg = 'token已过期';
        }

        throw new global.$error.Forbidden(errMsg);
      }

      if (decode.scope < this.level) {
        errMsg = '权限不足';
        throw new global.$error.Forbidden(errMsg);
      }

      ctx.auth = {
        uid: decode.uid,
        scope: decode.scope,
      };

      await next();
    };
  }
}

export { Auth };
