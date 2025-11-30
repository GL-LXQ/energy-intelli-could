<script setup lang="ts">
import { onMounted, reactive, ref, watch} from 'vue'
import type {StationFormData} from "@/types/station/index.ts"
import type { FormRules, FormInstance } from 'element-plus'
import { useStationStore } from '@/store/stationStore'
import {editStationApi} from "@/api/chargingstation"
import { ElMessage } from 'element-plus'

const formData = ref<StationFormData>(
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
const fromRules = reactive<FormRules<StationFormData>>(
  {
  name: [
    {
      required: true,
      message: '请输入站点名称',
      trigger: ['blur']
    }
  ],
  id: [
        { required: true, message: '站点id不能为空', trigger: 'blur' },
    ],
    city: [
        { required: true, message: '所属城市不能为空', trigger: 'blur' },
    ],
    person: [
        { required: true, message: '站点负责人不能为空', trigger: 'blur' },
    ],
    tel: [
        { required: true, message: '负责人电话不能为空', trigger: 'blur' },
    ],
    fast: [
        { required: true, message: '快充数不能为空', trigger: 'blur' },
    ],
    slow: [
        { required: true, message: '慢充数不能为空', trigger: 'blur' },
    ],
    status: [
        { required: true, message: '充电站状态不能为空', trigger: 'blur' },
    ],
    now: [
        { required: true, message: '正在充电数不能为空', trigger: 'blur' },
    ],
    fault: [
        { required: true, message: '故障数量不能为空', trigger: 'blur' },
    ]
}
)
const statusOptions = [
  {label:"全部", value:1},
  {label:"使用中", value:2},
  {label:"空闲中", value:3},
  {label:"维护中", value:4},
  {label:"待维修", value:5}
]
const stationStore = useStationStore()
const formInstance = ref<FormInstance>()
const props = defineProps(
  {
    dialogVisible: {
      type: Boolean,
      required: true
    }
  }
)
const emit = defineEmits(
  ['dialogClose', 'refreshTable']
)
const title = ref<string>("")
const isDisabled = ref<boolean>(true)
const handelDialogClose = () => {
  emit('dialogClose')
}
//处理弹层提交
const handleSubmit = async () => {
  await formInstance.value?.validate( async (valid:boolean)=> {
    if(!valid){
      ElMessage.error("请输入正确的信息")
      return
    }
    const res = await editStationApi(stationStore.stationInfo)
    if(res.code === 200){
      ElMessage.success(res.data)
      emit('refreshTable')
      handelDialogClose()
      }
  })
}

watch(()=>props.dialogVisible,
  () => {
    //判断是新建还是编辑
    if(stationStore.stationInfo.name){
      //编辑
      title.value = "编辑充电站信息"
      isDisabled.value = true
    }else{
      //新建
      title.value = "新建充电站信息"
      isDisabled.value = false
    }
    formData.value = stationStore.getStationInfo()
  },
  {
    deep: true,
    immediate: true
  }
)
onMounted(
  handleSubmit
)
</script>

<template>
   <el-dialog
    :model-value="dialogVisible"
    :title="title"
    width="800"
    destroy-on-close
    @close="handelDialogClose"
  >
  <el-form 
  :model="formData"
  :rules="fromRules"
  ref="formInstance"
  label-width="100px">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="站点名称:" prop="name">
          <el-input v-model="formData.name"/>
        </el-form-item>
        <el-form-item label="站点id:" prop="id">
          <el-input v-model="formData.id" :disabled="isDisabled"/>
        </el-form-item>
        <el-form-item label="所属城市:" prop="city">
          <el-input v-model="formData.city"/>
        </el-form-item>
        <el-form-item label="站点负责人:" prop="person">
          <el-input v-model="formData.person"/>
        </el-form-item>
        <el-form-item label="负责人电话:" prop="tel">
          <el-input v-model="formData.tel"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="快充数:" prop="fast">
          <el-input v-model="formData.fast"/>
        </el-form-item>
        <el-form-item label="慢充数:" prop="slow">
          <el-input v-model="formData.slow"/>
        </el-form-item>
        <el-form-item label="充电站状态:" prop="status">
          <el-select v-model="formData.status" :disabled="isDisabled">
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="正在充电:" prop="now">
          <el-input v-model="formData.now"  :disabled="isDisabled"/>
        </el-form-item>
        <el-form-item label="故障数:" prop="fault" >
          <el-input v-model="formData.fault" :disabled="isDisabled"/>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handelDialogClose">取消</el-button>
        <el-button type="primary" @click="handleSubmit">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>