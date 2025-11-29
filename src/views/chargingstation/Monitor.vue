<script setup lang="ts">
import {ref} from 'vue'

const queryParam = ref({
  queryValue: "",
  queryType: "",
  status: ""
})

</script>
<template>
  <div class="monitor">
    <el-card class="query-form-card">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input
          v-model="queryParam.queryValue"
            style="max-width: 600px"
            placeholder="请输入站点名称、ID"
            class="input-with-select"
          >
            <template #append>
              <el-select v-model="queryParam.queryType" placeholder="按名称查询" style="width: 115px">
                <el-option label="按名称查询" value="1" />
                <el-option label="按ID查询" value="2" />
              </el-select>
            </template>
          </el-input>
        </el-col>
        <el-col :span="6">
            <el-select v-model="queryParam.status" placeholder="充电站状态" style="width: 100%">
                    <el-option label="全部" :value="1"></el-option>
                    <el-option label="使用中" :value="2"></el-option>
                    <el-option label="空闲中" :value="3"></el-option>
                    <el-option label="维护中" :value="4"></el-option>
                    <el-option label="待维修" :value="5"></el-option>
            </el-select>
        </el-col>
        <el-col :span="6">
            <el-button type="primary">查询</el-button>
            <el-button>重置</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="monitor-detail-card mt">
      <el-row>
        <el-col :span="6">
          <el-statistic title="累积电量(度)" :value="269500" />
        </el-col>
        <el-col :span="6">
          <el-statistic title="累计充电次数(次)" :value="1333" />
        </el-col>
        <el-col :span="6">
          <el-statistic title="服务区域(个)" :value="88" />
        </el-col>
        <el-col :span="6">
          <el-statistic title="累计效益(元)" :value="5266178" />
        </el-col>
      </el-row>
    </el-card>
    <el-card class="mt">
      <el-button type="primary" icon="Plus">新建充电站</el-button>
    </el-card>
  </div>
</template>