/** @format */

import koaRouter from 'koa-router';
import { TicketDao } from '@/dao/ticket';
import { Responser } from '@/lib/helper';
import { Auth } from '@/middleware/auth';
import moment from 'moment';
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
  const [err, data] = await TicketDao.create(ctx);
  if (!err) {
    ctx.response.status = 200;
    ctx.body = res.success('消费券创建成功');
  } else {
    ctx.body = res.fail(err);
  }
});
// 申请使用消费券 需要:消费券类型，消费券id
router.post('/ticket/apply/:id', new Auth(Auth.CONSUMER).m, async (ctx) => {
  const { id } = ctx.params;
  if (!id) {
    throw new global.$error.ParameterException('缺少消费券id！');
  }
  const [err1, data1] = await TicketDao.getOne(id);
  if (err1) {
    ctx.body = res.fail(err1);
  }
  const apply_date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
  const [err, data] = await TicketDao.updateOne(id, {
    is_applying: 1,
    apply_date,
  });
  if (!err) {
    ctx.response.status = 200;
    ctx.body = res.success('消费券申请成功');
  } else {
    ctx.body = res.fail(err);
  }
});
// 同意申请并核销 需要:消费券id
router.post('/ticket/approve/:id', new Auth(Auth.PRODUCER).m, async (ctx) => {
  const { id } = ctx.params;
  if (!id) {
    throw new global.$error.ParameterException('缺少消费券id！');
  }
  const used_date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
  const [err1, data1] = await TicketDao.getOne(id);
  if (err1) {
    ctx.body = res.fail(err1);
  }
  const [err, data] = await TicketDao.updateOne(id, {
    is_applying: 0,
    is_used: 1,
    is_invalid: 1,
    used_date,
  });
  if (!err) {
    ctx.response.status = 200;
    ctx.body = res.success('核销成功！');
  } else {
    ctx.body = res.fail(err);
  }
});
// 拒绝申请 需要:消费券id
router.post('/ticket/reject/:id', new Auth(Auth.PRODUCER).m, async (ctx) => {
  const { id } = ctx.params;
  if (!id) {
    throw new global.$error.ParameterException('缺少消费券id！');
  }
  const used_date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
  const [err1, data1] = await TicketDao.getOne(id);
  if (err1) {
    ctx.body = res.fail(err1);
  }
  const [err, data] = await TicketDao.updateOne(id, {
    is_applying: 0,
    is_rejected: 1,
  });
  if (!err) {
    ctx.response.status = 200;
    ctx.body = res.success('拒绝申请成功');
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
router.delete('/ticket/:id', new Auth(Auth.SUPER_ADMIN).m, async (ctx) => {
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
