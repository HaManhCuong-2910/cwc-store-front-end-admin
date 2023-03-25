<template>
  <div>
    <FilterSearchAccountComponent @searchListAccount="searchListAccount" ref="filterSearch" />

    <el-table
      v-loading="dataReactive.isLoadingTable"
      :data="dataReactive.tableData"
      class="w-100 mt-5"
    >
      <el-table-column
        align="center"
        type="index"
        :index="(indexOrder: number)=>indexMethod(indexOrder,dataReactive.page as number)"
        width="50"
        fixed="left"
        label="STT"
      />
      <el-table-column align="center" fixed="left" width="350" label="Chủ tài khoản">
        <template #default="scope">
          <div class="d-flex align-items-center">
            <el-avatar :size="'large'" :src="scope.row.avatar" />
            <div class="text-left ml-3">
              <p class="title_name">{{ scope.row.name }}</p>
              <p>{{ scope.row.email }}</p>
              <p>{{ scope.row.phoneNumber }}</p>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" width="140" label="Trạng thái">
        <template #default="scope">
          <span
            :class="`${
              listStatusOption.find((item) => item.key === scope.row.status)?.class
            } text-light custom-text-status`"
          >
            {{ listStatusOption.find((item) => item.key === scope.row.status)?.value }}
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="180" label="Phân quyền">
        <template #default="scope">
          <span class="text-primary cursor-pointer" @click="openDialogRoles(scope.row)">
            <i><u>Xem quyền của user</u></i></span
          >
        </template>
      </el-table-column>
      <el-table-column align="center" label="Ngày tạo" width="250">
        <template #default="scope">
          <span>{{ moment(scope.row.createdAt).format('DD/MM/YYYY hh:mm') }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Ngày cập nhật" width="250">
        <template #default="scope">
          <span>{{ moment(scope.row.updatedAt).format('DD/MM/YYYY hh:mm') }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Thao tác" fixed="right" width="150">
        <template #default="scope">
          <div class="d-flex justify-content-center">
            <router-link
              :to="{
                name: 'DetailNews',
                params: {
                  id: scope.row._id
                }
              }"
            >
              <a-tooltip placement="top">
                <template #title>
                  <span>Xem chi tiết</span>
                </template>
                <span class="action-col mr-2">
                  <font-awesome-icon
                    :class="`color-custom-success`"
                    icon="fa-solid fa-circle-info"
                  />
                </span>
              </a-tooltip>
            </router-link>
            <router-link
              :to="{
                name: 'UpdateNews',
                params: {
                  id: scope.row._id
                }
              }"
            >
              <a-tooltip placement="top">
                <template #title>
                  <span>Sửa sản phẩm</span>
                </template>
                <span class="action-col mr-2">
                  <font-awesome-icon
                    :class="`color-custom-primary`"
                    icon="fa-regular fa-pen-to-square"
                  />
                </span>
              </a-tooltip>
            </router-link>

            <a-tooltip placement="top">
              <template #title>
                <span>Xóa tài khoản</span>
              </template>
              <span class="action-col mr-2 cursor-pointer" @click="openDialogDelete(scope.row._id)">
                <font-awesome-icon :class="`color-custom-danger`" icon="fa-regular fa-trash-can" />
              </span>
            </a-tooltip>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <div class="d-flex justify-content-end mt-4">
      <el-pagination
        layout="prev, pager, next"
        :page-count="dataReactive.count"
        :current-page="dataReactive.page"
        @current-change="handleChangePage"
      />
    </div>

    <DialogRolesAccountComponent
      :data="dataRolesAccountDialog"
      @closeDialog="closeDialogRoles"
      @resetTable="handleGetListAccount"
    />
  </div>
</template>

<style lang="scss" scoped>
.img-table {
  width: 180;
  height: 170px;
  object-fit: cover;
}
p {
  margin-bottom: 10px;
}
.title_name {
  font-size: 18px;
  font-weight: 600;
}
</style>

<script setup lang="ts">
import moment from 'moment'
import { onMounted, reactive, ref } from 'vue'
import { indexMethod } from '@/constant/constant'
import FilterSearchAccountComponent from './filter-search/FilterSearchAccountComponent.vue'
import DialogDefaultComponent from '../dialog-constant/DialogDefaultComponent.vue'
import DialogRolesAccountComponent, {
  type TListRoles
} from './dialog-roles-account/DialogRolesAccountComponent.vue'
import { ElMessage } from 'element-plus'
import { getListAccountApi, getListRolesApi } from '@/api/account'
import {
  EStatusAccount,
  type IDataAccount,
  type TQuerySearchAccount,
  listStatusOption
} from '@/api/account/data'
import type { Item } from 'ant-design-vue/lib/menu'

type TDataReactive = {
  tableData: IDataAccount[]
  page: number | string
  count: number | string
  isLoadingTable: boolean
  querySearch: TQuerySearchAccount
}

const dataReactive = reactive<TDataReactive>({
  tableData: [],
  isLoadingTable: false,
  page: '',
  count: '',
  querySearch: {}
})

const dataDeleteDialog = reactive({
  width: '28%',
  isOpenDialog: false,
  title: 'Xác nhận xóa sản phẩm',
  content: 'Bạn chắc chắn muốn xóa sản phẩm này?',
  isLoading: false,
  btnConfirm: 'Xác nhận xóa',
  id: ''
})

type TDataRolesAccountDialog = {
  isOpenDialog: boolean
  listRoles: TListRoles[]
  account: IDataAccount | null
}

const dataRolesAccountDialog = reactive<TDataRolesAccountDialog>({
  isOpenDialog: false,
  listRoles: [],
  account: null
})

const openDialogRoles = (account: IDataAccount) => {
  dataRolesAccountDialog.account = account
  dataRolesAccountDialog.isOpenDialog = true
}

const closeDialogRoles = (id: string) => {
  dataRolesAccountDialog.isOpenDialog = false
}

const closeDialogDelete = () => {
  dataDeleteDialog.isOpenDialog = false
}

const openDialogDelete = (id: string) => {
  dataDeleteDialog.isOpenDialog = true
  dataDeleteDialog.id = id
}

const filterSearch = ref<any>(null)

const handleGetListAccount = async (query?: TQuerySearchAccount) => {
  dataReactive.isLoadingTable = true
  const [res, error] = await getListAccountApi(query)
  if (res) {
    const { data, page, count } = res.data
    dataReactive.tableData = data
    dataReactive.page = Number(page)
    dataReactive.count = count
    dataReactive.isLoadingTable = false
  }
}

const searchListAccount = async (querySearch: TQuerySearchAccount) => {
  dataReactive.querySearch = querySearch
  await handleGetListAccount(querySearch)
  filterSearch.value.handleSetFalseIsLoading()
}

const handleChangePage = async (page: number) => {
  dataReactive.page = Number(page)
  await handleGetListAccount({ ...dataReactive.querySearch, ...{ page, limit: 10 } })
}

onMounted(async () => {
  await handleGetListAccount({ page: 1, limit: 10 })
  dataReactive.isLoadingTable = true
  const [res, error] = await getListRolesApi()
  if (res) {
    const { data } = res.data
    dataRolesAccountDialog.listRoles = data
    dataReactive.isLoadingTable = false
  }
})
</script>
