/** @format */

import koaRouter from 'koa-router';
import { TicketDao } from '@/dao/ticket';
import { Responser } from '@/lib/helper';
import { Auth } from '@/middleware/auth';
const router = new koaRouter({
  prefix: '/apis',
});
const res = new Responser();
// 查询消费券列表
router.get('/ticket', async (ctx) => {
  const [err, data] = await TicketDao.queryList();
  if (!err) {
    ctx.response.status = 200;
    ctx.body = res.json(data);
  } else {
    ctx.body = res.fail(err);
  }
});
// 创建消费券
router.post('/ticket', new Auth(Auth.PRODUCER).m, async (ctx) => {
  const { disReason, customImg, type } = ctx.request.body as any;
  const [err, data] = await TicketDao.create({
    disReason,
    customImg,
    type,
    createUserId: (ctx as any).auth.uid,
  });
  if (!err) {
    ctx.response.status = 200;
    ctx.body = res.success('消费券创建成功');
  } else {
    ctx.body = res.fail(err);
  }
});

// 修改消费券
router.put('/ticket/:id', new Auth(Auth.PRODUCER).m, async (ctx) => {
  const { id } = ctx.params;
  const [err, data] = await TicketDao.update(id, ctx);
  if (!err) {
    ctx.response.status = 200;
    ctx.body = res.success('消费券修改成功');
  } else {
    ctx.body = res.fail(err);
  }
});
// 删除消费券
router.delete('/ticket/:id', new Auth(Auth.PRODUCER).m, async (ctx) => {
  const { id } = ctx.params;
  const [err, data] = await TicketDao.destroy(id);
  if (!err) {
    ctx.response.status = 200;
    ctx.body = res.success('消费券删除成功');
  } else {
    ctx.body = res.fail(err);
  }
});
export { router };
