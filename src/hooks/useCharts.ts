import * as echarts from 'echarts';
import type { Ref} from 'vue';
import { ref, onMounted, markRaw, onBeforeUnmount,watch } from 'vue';
// import {getChartDataApi} from "@/api/dashboard"

export const useCharts = (chartRef:Ref<HTMLElement | null>, getChartData: any) => {
  //初始化图表
  const chartsInstance = ref<echarts.ECharts | null>(null)
  const initCharts = async () => {
    if(!chartRef.value) return
    chartsInstance.value = markRaw(echarts.init(chartRef.value))
    const options = await getChartData()
    chartsInstance.value.setOption(options?.value)
  }

  //图表刷新size
  const resizeCharts = ()=> chartsInstance.value?.resize()

  onMounted(
      () => {
        initCharts()
        window.addEventListener('resize', resizeCharts)
      }
  )

  onBeforeUnmount(
    () => {
      window.removeEventListener('resize', resizeCharts)
      chartsInstance.value?.dispose()
    }
  )
}