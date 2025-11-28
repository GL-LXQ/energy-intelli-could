import service from './axios'
interface ResponseData{
  code: number,
  msg: any,
  message: string
  data: any
}
const get = (url:string, params?:any):Promise<ResponseData> => {
  return service.get(url, {params})
}

const post = (url:string, data?:any):Promise<ResponseData> => {
  return service.post(url, data)
}

export {
  get,
  post
}