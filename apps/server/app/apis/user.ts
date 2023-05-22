/** @format */

import koaRouter from 'koa-router';
import { LoginManager } from '@/service/login';
import { UserDao } from '@/dao/user';
import { Responser } from '@/lib/helper';
const res = new Responser();
const router = new koaRouter({
  prefix: '/apis/user',
});
router.post('/login', async (ctx) => {
  const { username, password } = ctx.request.body as any;
  let [err, token, id] = await LoginManager.userLogin({
    username,
    password,
  });
  if (!err) {
    let [err, data] = await UserDao.detail(id);
    if (!err) {
      ctx.response.status = 200;
      Object.assign(data as any, { token });
      ctx.body = res.json(data);
    } else {
      ctx.body = res.fail(err);
    }
  } else {
    ctx.body = res.fail(err);
  }
});
export { router };
