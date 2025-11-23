import {get} from "@/utils/http"
import {post} from "@/utils/http"
enum Api {
  Login = "/login"
}
interface LoginParams {
  username: string,
  password: string
}


const loginApi = (data:LoginParams):Promise<any> => {
  return post(Api.Login, data)
}

export { loginApi }