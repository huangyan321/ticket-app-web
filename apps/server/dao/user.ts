/** @format */

import { Op } from 'sequelize';
import { getModel } from '@/models/index';
class UserDao {
  static async verify(username: string, password: string) {
    const userModel = getModel('x_user');
    const user = await userModel.findOne({
      where: {
        username,
      },
      raw: true,
    });
    if (!user) {
      throw new global.$error.AuthFailed('账号不存在');
    }
    const correct = user.password === password;
    if (!correct) {
      throw new global.$error.AuthFailed('账号不存在或者密码不正确');
    }
    return [null, user];
  }
  static async detail(id: number) {
    const scope = 'bh';
    try {
      const userModel = getModel('x_user');
      const user = await userModel.scope(scope).findOne({
        where: {
          id,
        },
        raw: true,
      });
      if (!user) {
        throw new global.$error.AuthFailed('账号不存在');
      }
      return [null, user];
    } catch (err) {
      return [err, null];
    }
  }
}
export { UserDao };
