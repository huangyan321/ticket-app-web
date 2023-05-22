/** @format */
import { UserDao } from '@/dao/user';
import { generateToken } from '@/core/utils';
import { Auth } from '@/middleware/auth';
class LoginManager {
  static async userLogin(params: any) {
    const { username, password } = params;
    const [err, user] = await UserDao.verify(username, password);
    const auth =
      user.role == 1
        ? Auth.SUPER_ADMIN
        : user.role === 2
        ? Auth.PRODUCER
        : Auth.CONSUMER;
    if (!err) {
      return [null, generateToken(user.id, auth), user.id];
    } else {
      return [err, null];
    }
  }
}
export { LoginManager };
