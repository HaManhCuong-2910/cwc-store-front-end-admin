<template>
  <el-dialog
    v-model="props.data.isOpenDialog"
    @close="closeDialog"
    :width="props.data.width"
    :title="props.data.title"
  >
    <div class="container">
      <p>{{ props.data.content }}</p>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">Đóng</el-button>
        <el-button type="danger" @click="submitDialog" :loading="props.data.isLoading">{{
          props.data.btnConfirm
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped></style>

<script setup lang="ts">
import { ChangeStatusOrder } from '@/api/order'
import { formatNumberMoney } from '@/constant/constant'
import { ElMessage } from 'element-plus'
import type { PropType } from 'vue'

type TDialogDefault = {
  width: string
  isOpenDialog: boolean
  title: string
  content: string
  isLoading: boolean
  btnConfirm: string
  id: string
}

const props = defineProps({
  data: { type: Object as PropType<TDialogDefault>, required: true }
})

const emit = defineEmits(['closeDialog', 'submitDialog'])

const closeDialog = () => {
  emit('closeDialog')
}

const submitDialog = () => {
  emit('submitDialog')
}
</script>
