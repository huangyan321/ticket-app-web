// // 统一输出
import HyRequest from './request';
import { BASE_URL, TIME_OUT } from './request/config';
export default new HyRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  showLoading: false
});
