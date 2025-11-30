import {get, post} from "@/utils/http"
import type{StationFormData} from "@/types/station/index.ts"
interface ListType{
  page:number,
  pageSize: number,
  name?: string,
  id?: number,
  status: number
}

const getListApi = (data:ListType) => {
  return post('stationList', data)
}

const editStationApi = (data:StationFormData) => {
  return post('/station/edit', data)
}

const deleteStationApi = (id:string) => {
  return post('/station/delete', {id})
}

export {
  getListApi,
  editStationApi,
  deleteStationApi
}