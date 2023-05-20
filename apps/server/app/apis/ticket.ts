/** @format */

import koaRouter from 'koa-router';
import { TicketDao } from '@/dao/ticket';
import { UserDao } from '@/dao/user';
import { Responser } from '@/lib/helper';
import { Auth } from '@/middleware/auth';
const router = new koaRouter({
  prefix: '/apis/ticket',
});
const res = new Responser();
router.post('/query', async (ctx) => {
  const [err, data] = await TicketDao.queryList();
  if (!err) {
    ctx.response.status = 200;
    ctx.body = res.json(data);
  } else {
    ctx.body = res.fail(err);
  }
});
router.post('/add', new Auth(Auth.PRODUCER).m, async (ctx) => {
  const { disReason, customImg, type } = ctx.request.body as any;
  const [err, data] = await TicketDao.add({
    disReason,
    customImg,
    type,
    createUserId: (ctx as any).auth.uid,
  });
  if (!err) {
    ctx.response.status = 200;
    ctx.body = res.json(data);
  } else {
    ctx.body = res.fail(err);
  }
});
export { router };
