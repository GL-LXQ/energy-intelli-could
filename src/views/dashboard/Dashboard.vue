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
import {ref,onMounted, reactive} from 'vue'
import { useCharts } from "@/hooks/useCharts"
import {getChartDataApi, getChartDataApi2, getChartDataApi3} from "@/api/dashboard"

const chart1 = ref(null)
const chart2 = ref(null)
const chart3 = ref(null)
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
const getChartData2 = async () => {
    const chartOptions: any = ref({
        legend: {
            top: 'bottom'
        },
        tooltip: {
            trigger: "item",
            formatter: '{a}<br/>{b}:{c}'
        },
        series: [
            {
                name: '营收占比',
                type: 'pie',
                radius: ["50%", "70%"],
                center: ['50%', '50%'],
                roseType: "area",
                emphasis: {
                    label: {
                        show: true,
                        fontSize: "16",
                        fontWeight: "bold"
                    }
                },
                data: []
            }
        ],
        graphic: {
            type: 'text',
            left: "center",
            top: "center",
            style: {
                text: "营收占比",
                fontSize: 20,
                fill: "#333"
            }
        }
    })
    const res = await getChartDataApi2()
    chartOptions.value.series[0].data = res.data.list;
    return chartOptions
}
const getChartData3 = async () => {
    const chartOptions: any = ref({
        radar: {
            // shape: 'circle',
            indicator: [
                { name: '闲置数', max: 65 },
                { name: '使用数', max: 160 },
                { name: '故障数', max: 300 },
                { name: '维修数', max: 380 },
                { name: '更换数', max: 520 },
                { name: '报废数', max: 250 }
            ]
        },
        series: [
            {
                name: '设备总览',
                type: 'radar',
                data: [
                    {
                        value: [],
                        name: '设备总览'
                    },

                ]
            }
        ]
    })
    const res = await getChartDataApi3();
    chartOptions.value.series[0].data[0].value = res.data.list
    return chartOptions
}


// 绘制图表
useCharts(chart2, getChartData)
useCharts(chart1, getChartData2)
useCharts(chart3, getChartData3)



</script>
<template>
  <el-row :gutter="20">
    <el-col :span="18">
        <el-card class="equipment-status-card">
            <div class="title mb">
              <h2>今日设备运行状态</h2>
              <p class="refresh-time">更新时间：2025-11-28 12:00:00</p>
              <RefreshRight style="width: 1em; height: 1em; margin-left: 5px; cursor: pointer;" />
            </div>
            <div class="equipment ml mr">
              <div class="item">
                <p class="mb">充电桩使用率</p>
                <img :src="flash" alt="">
                <h1 style="margin-bottom: 8px;">72/95</h1>
                <!-- 统计组件 -->
                <div class="statistic-card" style="margin-top: 13px;">
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
                <div class="statistic-card"  style="margin-top: 13px;">
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
                <div class="statistic-card"  style="margin-top: 13px;">
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
              <h2>常用功能</h2>
            </div>
          </template>
          <ul class="card-content mb mt">
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
              <h2>能源统计</h2>
            </div>
          </template>
          <el-row class="mb mt">
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
                <template #header>
                    <div class="card-heder"> 
                        <h4>设备总览</h4>
                    </div>
                </template>
                <div ref="chart3" style="width:100%;height: 240px;"></div>
            </el-card>

            <el-card class="mt">
                <template #header>
                    <div class="card-heder">
                        <h4>营收统计表</h4>
                    </div>
                </template>
                <ul class="ranking-list">
                    <li class="ranking-item">
                        <span class="rank" style="background-color: rgb(103, 194, 58);color: #fff;">1</span>
                        <span class="store-name">广州</span>
                        <span class="sales">52,457</span>
                        <span style="margin-left:50px">
                            24%
                            <el-icon color="green">
                                <CaretTop />
                            </el-icon>
                        </span>
                    </li>
                    <li class="ranking-item">
                        <span class="rank" style="background-color:rgb(64, 158, 255) ;color: #fff ;">2</span>
                        <span class="store-name">上海</span>
                        <span class="sales">323,234</span>
                        <span style="margin-left: 50px;">
                            24%
                            <el-icon color="red">
                                <CaretBottom />
                            </el-icon>
                        </span>
                    </li>
                    <li class="ranking-item">
                        <span class="rank" style="background-color:rgb(230, 162, 60) ;color: #fff ;">3</span>
                        <span class="store-name">佛山</span>
                        <span class="sales">192,255</span>
                        <span style="margin-left: 50px;">
                            24%
                            <el-icon color="red">
                                <CaretBottom />
                            </el-icon>
                        </span>
                    </li>
                    <li class="ranking-item">
                        <span class="rank">4</span>
                        <span class="store-name">珠海</span>
                        <span class="sales">17,540</span>
                        <span style="margin-left: 50px;">
                            24%
                            <el-icon color="green">
                                <CaretTop />
                            </el-icon>
                        </span>
                    </li>
                    <li class="ranking-item">
                        <span class="rank">5</span>
                        <span class="store-name">深圳</span>
                        <span class="sales">662,337</span>
                        <span style="margin-left: 50px;">
                            24%
                            <el-icon color="red">
                                <CaretBottom />
                            </el-icon>
                        </span>
                    </li>
                    <li class="ranking-item">
                        <span class="rank">6</span>
                        <span class="store-name">厦门</span>
                        <span class="sales">22,941</span>
                        <span style="margin-left: 50px;">
                            24%
                            <el-icon color="green">
                                <CaretTop />
                            </el-icon>
                        </span>
                    </li>
                    <li class="ranking-item">
                        <span class="rank">7</span>
                        <span class="store-name">长沙</span>
                        <span class="sales">565,221</span>
                        <span style="margin-left: 50px;">
                            24%
                            <el-icon color="green">
                                <CaretTop />
                            </el-icon>
                        </span>
                    </li>
                </ul>
            </el-card>
             <el-card class="mt">
                <template #header>
                    <div class="card-heder">
                        <h4>故障报警</h4>
                    </div>
                </template>
                <el-timeline style="max-width: 600px">
                    <el-timeline-item timestamp="2024/4/12" placement="top" :hollow="true" type="danger">
                        <el-card>
                            <h4>矿业北路通讯中断</h4>
                        </el-card>
                    </el-timeline-item>
                    <el-timeline-item timestamp="2024/2/3" placement="top" :hollow="true" type="warning">
                        <el-card>
                            <h4>黄河南路超出服务区域</h4>
                           
                        </el-card>
                    </el-timeline-item>
                    <el-timeline-item timestamp="2024/5/17" placement="top" :hollow="true" type="danger">
                        <el-card>
                            <h4>6号机组异常断电</h4>
                          
                        </el-card>
                    </el-timeline-item>
                </el-timeline>
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


.ranking-list {
    .ranking-item {
        display: flex;
        justify-content: space-between;
        padding: 10px;

        .rank {
            display: inline-block;
            font-weight: bold;
            color: #666;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            text-align: center;
            line-height: 30px;
        }

        .store-name {
            flex-grow: 1;
            padding: 0 10px;
        }

        .sales {
            color: #666;
        }
    }

    .ranking-item:nth-child(even) {
        background-color: rgb(253, 246, 236);
    }
}
</style>