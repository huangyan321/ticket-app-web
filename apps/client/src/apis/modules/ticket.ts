import request from '@/service'

export function getTicketList() {
  return request.get<DataType>({
    url: 'ticket'
  })
}
export function editTicket(id: number, data: any) {
  return request.put<DataType>({
    url: 'ticket/' + id,
    data
  })
}
export function deleteTicket(id: number) {
  return request.delete<DataType>({
    url: 'ticket/' + id
  })
}
export function addTicket() {
  return request.post<DataType>({
    url: 'ticket'
  })
}
// 申请使用消费券
export function applyTicket(id: number) {
  return request.post<DataType>({
    url: 'ticket/' + id
  })
}
// 同意申请并核销
export function approveTicket(id: number) {
  return request.post<DataType>({
    url: 'ticket/' + id
  })
}
// 拒绝申请
export function rejectTicket(id: number) {
  return request.post<DataType>({
    url: 'ticket/' + id
  })
}
