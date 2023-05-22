import request from '@/service'
export function login() {
  return request.get<DataType>({
    url: '/user/login'
  })
}
