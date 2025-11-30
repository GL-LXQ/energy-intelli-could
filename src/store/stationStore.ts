import type {StationFormData} from "@/types/station/index.ts"
import {ref} from "vue"
import { defineStore } from 'pinia'
export const useStationStore = defineStore("stationStore",
  () => {
    const stationInfo = ref<StationFormData>(
      {
        name:"",
        id:"",
        city:"",
        fast:"",
        slow:"",
        status:1,
        now:"",
        fault:"",
        person:"",
        tel:""
      }
    )

    const setStationInfo = (data:StationFormData)=> {
      stationInfo.value = data
    }
    const getStationInfo = ()=> {
      return stationInfo.value
    }

    return {
      stationInfo,
      setStationInfo,
      getStationInfo
    }
  }
)