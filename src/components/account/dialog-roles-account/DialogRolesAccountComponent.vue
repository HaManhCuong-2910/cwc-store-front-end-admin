<template>
  <el-dialog
    v-model="props.data.isOpenDialog"
    @close="closeDialog"
    :width="'50%'"
    :title="'Quyền của người dùng'"
  >
    <div class="container">
      <div class="row">
        <div class="col-4" v-for="item in dataListRolesCustom">
          <el-checkbox
            :label="item.name"
            v-model="item.isChecked"
            size="large"
            border
            class="m-2 w-100"
          />
        </div>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">Đóng</el-button>
        <el-button type="danger" @click="submitDialog" :loading="isLoading">Cập nhật</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped></style>

<script setup lang="ts">
import { updateAccountApi } from '@/api/account'
import type { IDataAccount, TUpdateAccount } from '@/api/account/data'
import { ElMessage } from 'element-plus'
import { onMounted, ref, watch, type PropType } from 'vue'

export type TListRoles = {
  _id: string
  name: string
  value: string
  isChecked?: boolean
}

type TDialogDefault = {
  isOpenDialog: boolean
  listRoles: TListRoles[]
  account: IDataAccount | null
}

const props = defineProps({
  data: { type: Object as PropType<TDialogDefault>, required: true }
})

const dataListRolesCustom = ref<TListRoles[]>([])
const isLoading = ref<boolean>(false)
const emit = defineEmits(['closeDialog', 'resetTable', 'setRolesChecked'])

const closeDialog = () => {
  emit('closeDialog')
}

const submitDialog = async () => {
  const listCheckedRoles = dataListRolesCustom.value
    .filter((item) => item.isChecked)
    .map((itemMap) => itemMap.value)
  if (props.data.account?._id) {
    const dataUpdate: TUpdateAccount = {
      _id: props.data.account._id,
      roles: listCheckedRoles
    }
    isLoading.value = true

    const [res, error] = await updateAccountApi(dataUpdate)
    isLoading.value = false
    if (res) {
      ElMessage({
        message: 'Cập nhật thành công',
        type: 'success',
        duration: 800
      })
    } else {
      ElMessage({
        message: 'Cập nhật không thành công',
        type: 'error',
        duration: 800
      })
    }
    emit('resetTable')
  } else {
    emit('setRolesChecked', listCheckedRoles)
  }

  emit('closeDialog')
}

watch(
  () => [props.data.listRoles, props.data.account],
  () => {
    dataListRolesCustom.value = props.data.listRoles.map((item) => {
      return {
        ...item,
        isChecked: props.data.account?.roles?.find((itemRole) => itemRole === item.value)
          ? true
          : false
      }
    })
  }
)
</script>
