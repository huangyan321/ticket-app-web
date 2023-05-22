const isProd = import.meta.env.MODE === 'production'
console.log(import.meta.env.MODE)

export const TIME_OUT = 5000
// 默认请求时展示loading
export const DEFAULT_LOADING = false

export const BASE_URL = isProd ? 'http://localhost:4455/apis/' : 'http://localhost:4455/apis/'
