/** @format */
import { ParameterizedContext } from 'koa';
import { UserDao } from '@/dao/user';
import { generateToken } from '@/core/utils';
class LoginManager {
  static async userLogin(params: any) {
    const { username, password } = params;
    const [err, user] = await UserDao.verify(username, password);
    if (!err) {
      return [null, generateToken(user.id, 123), user.id];
    } else {
      return [err, null];
    }
  }
}
export { LoginManager };
