/** @format */

import { Op } from 'sequelize';
import { getModel } from '@/models/index';
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
  static async add(params: {
    createUserId: number;
    disReason: string;
    customImg: string;
    type: '1' | '2' | '3' | '4';
  }) {
    const { createUserId, disReason, customImg, type } = params;
    console.log(params);

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
}
export { TicketDao };
