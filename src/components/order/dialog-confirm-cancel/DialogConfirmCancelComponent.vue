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
import { ChangeStatusOrder } from '@/api/order'
import { formatNumberMoney } from '@/constant/constant'
import { ElMessage } from 'element-plus'
import { onMounted, ref, watch, type PropType } from 'vue'
import { EStatusOrder, type DataOrderItem, type IDataOrderResponse } from '../data'
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
  const [res, err] = await ChangeStatusOrder({
    id: props.id as string,
    status: EStatusOrder.CANCEL
  })
  if (res) {
    emit('resetListOrder')
    ElMessage({
      message: 'Hủy đơn hàng thành công',
      type: 'success',
      duration: 800
    })
    isLoading.value = false
    emit('closeDialog')
  } else {
    ElMessage({
      message: 'Hủy đơn hàng không thành công',
      type: 'error',
      duration: 800
    })
    isLoading.value = false
    emit('closeDialog')
  }
}
</script>
