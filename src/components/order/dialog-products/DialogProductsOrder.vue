<template>
  <el-dialog v-model="props.isOpenDialog" @close="closeDialog" title="Xác nhận hủy đơn hàng">
    <div class="row container-dialog">
      <div class="col-12 mb-3" v-for="item in props.data">
        <div class="card-custom d-flex">
          <img :src="item.id.images[0]" :alt="`Ảnh ${item.name}`" />
          <div>
            <div class="mb-2"><strong>Tên sản phẩm:</strong> {{ item.name }}</div>
            <div class="mb-2">
              <strong>Giá:</strong> {{ formatNumberMoney(item.id.sales) }} VNĐ
              <span class="text-decoration-line-through text-danger"
                >{{ formatNumberMoney(item.id.price) }} VNĐ</span
              >
            </div>
            <div class="mb-2"><strong>Số lượng đặt:</strong> {{ item.quantity }}</div>
            <div class="mb-2"><strong>Kích cỡ:</strong> {{ item.size }}</div>
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">Đóng</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.container-dialog {
  max-height: 350px;
  overflow-y: auto;
}
.card-custom {
  img {
    width: 180px;
    height: 180px;
    border-radius: 8px;
    margin-right: 20px;
  }

  font-size: 16px;
  border: 1px solid #c8d6e5;
  padding: 10px;
  border-radius: 15px;
}
</style>

<script setup lang="ts">
import { formatNumberMoney } from '@/constant/constant'
import type { PropType } from 'vue'
import type { DataOrderItem, IDataOrderResponse } from '../data'
const props = defineProps({
  data: Array as PropType<DataOrderItem[]>,
  isOpenDialog: Boolean
})

const emit = defineEmits(['closeDialog'])

const closeDialog = () => {
  emit('closeDialog')
}
</script>
