<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {getListApi} from "@/api/chargingstation"
import stationForm from "@/views/chargingstation/components/stationForm.vue"
import {useStationStore} from "@/store/stationStore.ts"
import type {StationFormData} from "@/types/station/index.ts"
import {deleteStationApi} from "@/api/chargingstation"
import { ElMessage } from 'element-plus'

const tableData = ref<StationFormData[]>([])
const queryParam = ref({
  queryValue: "",
  queryType: "",
  status: 1
})
const pageInfo = ref({
  page: 1,
  pageSize: 10,
})
const totals = ref(0)
const loading = ref(true)
const dialogVisible = ref(false)
const stationStore = useStationStore()

//获取分页数据
const getList = async ()=> {
  loading.value = true
  const {data: {list, total}} = await getListApi(
                  {
                    ...pageInfo.value,
                    status: queryParam.value.status,
                    [queryParam.value.queryType]: queryParam.value.queryValue,
                  }
                )
  tableData.value = list
  totals.value = total 
  loading.value = false
}
//处理size变化
const handleSizeChange = ()=> {
  getList()
}
//处理页码变化
const handleCurrentChange = ()=> {
  getList()
}
//处理重置
const handleReset = () => {
  queryParam.value.queryValue = ""
  queryParam.value.queryType = "name"
  queryParam.value.status = 1
  pageInfo.value.page=1
  pageInfo.value.pageSize=10;
  getList()
}
//处理编辑
const handleEdit = (row:StationFormData) => {
  stationStore.setStationInfo(row)
  dialogVisible.value = true
}
//处理新建
const handleAdd = () => {
  stationStore.setStationInfo(
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
  dialogVisible.value = true
}
//处理删除
const handleDelete = async (row:StationFormData) => {
  const res = await deleteStationApi(row.id)
  console.log(res)
  if(res.code === 200){
    ElMessage.success("删除成功")
    getList()
  }
}


onMounted(
  getList
)

</script>
<template>
  <div class="monitor">
    <el-card class="query-form-card">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input
            v-model.trim="queryParam.queryValue"
            style="max-width: 600px"
            placeholder="请输入站点名称、ID"
            class="input-with-select"
          >
            <template #append>
              <el-select v-model="queryParam.queryType" placeholder="按名称查询" style="width: 115px">
                <el-option label="按名称查询" value="name" />
                <el-option label="按ID查询" value="id" />
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
            <el-button type="primary" @click="getList">查询</el-button>
            <el-button @click="handleReset">重置</el-button>
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
      <el-button type="primary" icon="Plus" @click="handleAdd">新建充电站</el-button>
    </el-card>
    <!-- 表格 -->
     
    <el-card class="mt">
      <el-table :data="tableData" style="width: 100%" v-loading="loading">
        <el-table-column type="index" label="序号" width="80" />
        <el-table-column prop="name" label="站点名称" />
        <el-table-column prop="id" label="站点ID" />
        <el-table-column prop="fast" label="快充数" />
        <el-table-column prop="slow" label="慢充数" />
        <el-table-column label="充电站状态">
          <template #default="scope">
            <el-tag v-if="scope.row.status === 2" type="primary" >使用中</el-tag>
            <el-tag v-if="scope.row.status === 3" type="success">空闲中</el-tag>
            <el-tag v-if="scope.row.status == 4" type="warning">维护中</el-tag>
            <el-tag v-if="scope.row.status == 5" type="danger">待维修</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="now" label="正在充电" />
        <el-table-column prop="fault" label="故障数" />
        <el-table-column prop="person" label="站点负责人" />
        <el-table-column prop="tel" label="负责人电话" />
        <el-table-column fixed="right" label="操作" min-width="132">
          <template #default="scope">
            <el-button type="primary" size="small" @click="handleEdit(scope.row)">
              编辑
            </el-button>
            <el-popconfirm title="确定删除?" @confirm="handleDelete(scope.row)">
              <template #reference>
                <el-button type="danger" size="small">
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
       <el-pagination
       class="mt"
          v-model:current-page="pageInfo.page"
          v-model:page-size="pageInfo.pageSize"
          :page-sizes="[10, 20, 30, 40]"
          size="default"
          layout="sizes, prev, pager, next, jumper, total"
          :total="totals"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
    </el-card>
    <stationForm 
    :dialogVisible="dialogVisible" 
    @dialogClose="dialogVisible = false"
    @refreshTable="getList">
    </stationForm>
  </div>
</template>

<style lang="less" scoped>
.el-pagination {
  display: flex;
  justify-content: center;
}
</style>