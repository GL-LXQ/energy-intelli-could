<script setup lang="ts">
import flash from "@/assets/flash.png"
import flash2 from "@/assets/flash2.png"
import flash3 from "@/assets/flash3.png"
import repair from "@/assets/repair.png"
import progress from "@/assets/progress.png"
import remain from "@/assets/remain.png"
import total from "@/assets/total.png"
import money from "@/assets/money.png"
import daily from "@/assets/daily.png"
import * as echarts from 'echarts';
import {ref,onMounted} from 'vue'
import { useCharts } from "@/hooks/useCharts"
import {getChartDataApi} from "@/api/dashboard"

const chart1 = ref(null)
const chart2 = ref(null)
const chartOptionsList = ref<any>([])
//图表Options数据

//set图表Options数据
const getChartData = async () => {
  const chartOptions:any = ref({
  title: {
    text: '电量统计'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: []
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00']
  },
  yAxis: {
    type: 'value',
      axisLabel:{
      formatter: '{value}kw'
    }
  },
  series: [//
    {
      name: '',//
      type: 'line',
      data: [],//
      lineStyle: {
        width: 2
      },
      itemStyle: {
        color: "purple",
        shadowBlur: 2,
        shadowColor: 'rgba(0, 255, 0,0.5)'
      },
      smooth: true
    },
    {
      name: '',
      type: 'line',
      data: [],
      lineStyle: {
        width: 2
      },
      itemStyle: {
        color: "lightgreen",
        shadowBlur: 2,
        shadowColor: 'rgba(0, 255,  0, 0.5)'
      },
      smooth: true
    },
    {
      name: '',
      type: 'line',
      data: [],
      lineStyle: {
        width: 2
      },
      itemStyle: {
        color: "skyblue",
        shadowBlur: 2,
        shadowColor: 'rgba(0, 255, 0, 0.5)'
      },
      smooth: true
    }
  ]
})
  const {data: {list}} = await getChartDataApi()
  chartOptionsList.value = list
  chartOptions.value.legend.data = chartOptionsList.value.map((item:any) => item.name)
  for(let i = 0; i < chartOptions.value.series.length; i++){
    chartOptions.value.series[i].name = chartOptionsList.value[i]?.name
    chartOptions.value.series[i].data = chartOptionsList.value[i]?.data
    }
  return chartOptions
}

// 绘制图表
useCharts(chart2, getChartData)

</script>
<template>
  <el-row :gutter="20">
    <el-col :span="18">
        <el-card class="equipment-status-card">
            <div class="title mb">
              <h4>今日设备运行状态</h4>
              <p class="refresh-time">更新时间：2025-11-28 12:00:00</p>
              <RefreshRight style="width: 1em; height: 1em; margin-left: 5px; cursor: pointer;" />
            </div>
            <div class="equipment ml mr">
              <div class="item">
                <p class="mb">充电桩使用率</p>
                <img :src="flash" alt="">
                <h1 style="margin-bottom: 8px;">72/95</h1>
                <!-- 统计组件 -->
                <div class="statistic-card">
                  <el-statistic :value="9">
                    <template #title>
                      <div style="display: inline-flex; align-items: center">
                        异常设备
                        <el-tooltip
                          effect="dark"
                          content="今日无异常"
                          placement="top"
                        >
                          <el-icon style="margin-left: 4px; color: green;" :size="12">
                            <Warning />
                          </el-icon>
                        </el-tooltip>
                      </div>
                    </template>
                  </el-statistic>
                  <div class="statistic-footer">
                    <div class="footer-item">
                      <span>相较昨日</span>
                      <span class="green">
                        24%
                        <el-icon style="color: green;">
                          <CaretTop />
                        </el-icon>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="item">
                <p class="mb">充电柜使用率</p>
                <img :src="flash2" alt="">
                <h1 style="margin-bottom: 8px;">655 / 1233</h1>
                <!-- 统计组件 -->
                <div class="statistic-card">
                  <el-statistic :value="22">
                    <template #title>
                      <div style="display: inline-flex; align-items: center">
                        异常设备
                        <el-tooltip
                          effect="dark"
                          content="今日无异常"
                          placement="top"
                        >
                          <el-icon style="margin-left: 4px; color: green;" :size="12">
                            <Warning />
                          </el-icon>
                        </el-tooltip>
                      </div>
                    </template>
                  </el-statistic>
                  <div class="statistic-footer">
                    <div class="footer-item">
                      <span>相较昨日</span>
                      <span class="green">
                        24%
                        <el-icon style="color: green;">
                          <CaretTop />
                        </el-icon>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="item">
                <p class="mb">充电站使用率</p>
                <img :src="flash3" alt="">
                <h1 style="margin-bottom: 8px;">2263 / 3398</h1>
                <!-- 统计组件 -->
                <div class="statistic-card">
                  <el-statistic :value="47">
                    <template #title>
                      <div style="display: inline-flex; align-items: center">
                        异常设备
                        <el-tooltip
                          effect="dark"
                          content="今日无异常"
                          placement="top"
                        >
                          <el-icon style="margin-left: 4px;  color: green;" :size="12">
                            <Warning />
                          </el-icon>
                        </el-tooltip>
                      </div>
                    </template>
                  </el-statistic>
                  <div class="statistic-footer">
                    <div class="footer-item">
                      <span>相较昨日</span>
                      <span class="green">
                        24%
                        <el-icon style="color: green;">
                          <CaretTop />
                        </el-icon>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </el-card>
        <!-- 常用功能卡片 -->
        <el-card class="often-use-card mt">
          <!-- 标题 -->
          <template #header>
            <div class="card-header">
              <h4>常用功能</h4>
            </div>
          </template>
          <ul class="card-content">
            <li>
              <img :src="repair" alt="">
              <p>设备维修</p>
            </li>
            <li>
              <img :src="daily" alt="">
              <p>每日周报</p>
            </li>
            <li>
              <img :src="progress" alt="">
              <p>任务进度</p>
            </li>
            <li>
              <img :src="total" alt="">
              <p>营收占比</p>
            </li>
            <li>
              <img :src="money" alt="">
              <p>营收统计</p>
            </li>
            <li>
              <img :src="remain" alt="">
              <p>代办事项</p>
            </li>
          </ul>
        </el-card>
        <!-- 能源统计卡片 -->
         <el-card class="energy-count-card mt">
          <!-- 标题 -->
          <template #header>
            <div class="card-header">
              <h4>能源统计</h4>
            </div>
          </template>
          <el-row>
            <el-col :span="6">
              <div ref="chart1" style="width: 100%; height: 400px;">图表1</div>
            </el-col>
            <el-col :span="18">
              <div ref="chart2" style="width: 100%; height: 400px;">图表2</div>
            </el-col>
          </el-row>
         </el-card>
      </el-col>

      <el-col :span="6">
        <el-card>
          右
        </el-card>
      </el-col>
  </el-row>
</template>

<style lang="less" scoped>
.title {
  display: flex;
  align-items: flex-end;

  .refresh-time {
    font-size: 14px;
    color: #909399;
    margin-left: 20px;
  }

}
.equipment {
  display: flex;
  justify-content: space-between;
}

.often-use-card {

  .card-content {
    display: flex;
    justify-content: space-between;
    padding-left: 20px;
    padding-right: 20px;

    li {
      cursor: pointer;
    }
  }
}
</style>