<template>
  <el-dialog
    v-model="props.isOpenDialog"
    @close="closeDialog"
    width="26%"
    title="Danh sách sản phẩm đặt mua"
  >
    <div class="container">
      <p>Bạn chắc chắn muốn hủy đơn hàng này?</p>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">Đóng</el-button>
        <el-button type="danger" @click="CancelOrder" :loading="isLoading">Xác nhận Hủy</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped></style>

<script setup lang="ts">
import { cancelOrderApi } from '@/api/order'
import { formatNumberMoney } from '@/constant/constant'
import { ElMessage } from 'element-plus'
import { onMounted, ref, watch, type PropType } from 'vue'
import type { DataOrderItem, IDataOrderResponse } from '../data'
const props = defineProps({
  id: String,
  isOpenDialog: Boolean
})

const emit = defineEmits(['closeDialog', 'resetListOrder'])

const closeDialog = () => {
  emit('closeDialog')
}

const isLoading = ref<boolean>(false)

watch(
  () => props.id,
  () => {
    console.log('props', props.id)
  }
)

const CancelOrder = async () => {
  isLoading.value = true
  const [res, err] = await cancelOrderApi(props.id as string)
  if (res) {
    emit('resetListOrder')
    ElMessage({
      message: res.data.message,
      type: 'success',
      duration: 800
    })
    isLoading.value = false
    emit('closeDialog')
  } else {
    ElMessage({
      message: res.data.message,
      type: 'error',
      duration: 800
    })
    isLoading.value = false
    emit('closeDialog')
  }
}
</script>
