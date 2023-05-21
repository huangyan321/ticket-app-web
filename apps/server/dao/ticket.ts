/** @format */

import { Op } from 'sequelize';
import { getModel } from '@/models/index';
import { Context } from 'koa';
import { isDef } from '@xieting/utils';
class TicketDao {
  static async queryList() {
    const scope = 'bh';
    try {
      const ticketModel = getModel('x_ticket');
      const tickets = await ticketModel.scope(scope).findAll({
        raw: true,
      });
      return [null, tickets];
    } catch (err) {
      return [err, null];
    }
  }
  static async create(params: {
    createUserId: number;
    disReason: string;
    customImg: string;
    type: '1' | '2' | '3' | '4';
  }) {
    const { createUserId, disReason, customImg, type } = params;
    try {
      const ticketModel = getModel('x_ticket');
      const tickets = await ticketModel.create({
        create_user_id: createUserId,
        dis_reason: disReason,
        custom_img: customImg,
        type,
        is_invalid: 0,
        is_applying: 0,
        is_used: 0,
      });
      return [null, tickets];
    } catch (err) {
      return [err, null];
    }
  }
  static async update(id: number | string, ctx: Context) {
    try {
      const {
        disReason,
        customImg,
        type,
        is_invalid,
        is_applying,
        is_used,
        is_deleted,
      } = ctx.request.body as any;
      const ticketModel = getModel('x_ticket');
      const ticket = await ticketModel.findByPk(id);
      isDef(disReason) ? (ticket.dis_reason = disReason) : '';
      isDef(customImg) ? (ticket.custom_img = customImg) : '';
      isDef(type) ? (ticket.type = type) : '';
      isDef(is_invalid) ? (ticket.is_invalid = is_invalid) : '';
      isDef(is_applying) ? (ticket.is_applying = is_applying) : '';
      isDef(is_used) ? (ticket.is_used = is_used) : '';
      isDef(is_deleted) ? (ticket.is_deleted = is_deleted) : '';
      try {
        const res = await ticket.save();
        return [null, res];
      } catch (err) {
        return [err, null];
      }
    } catch (err) {
      return [err, null];
    }
  }
  static async destroy(id: string | number) {
    const ticketModel = getModel('x_ticket');
    const ticket = await ticketModel.findOne({
      where: {
        id,
        deleted_at: null,
      },
    });
    if (!ticket) {
      throw new global.$error.NotFound('没有找到相关消费券');
    }
    try {
      // 软删除消费券
      const res = await ticket.destroy({
        // 默认为软删除
        force: false,
      });
      return [null, res];
    } catch (err) {
      return [err, null];
    }
  }
}
export { TicketDao };
