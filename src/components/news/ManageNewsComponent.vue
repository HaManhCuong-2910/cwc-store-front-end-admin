<template>
  <div>
    <FilterSearchNewsComponent @searchListNews="searchListNews" ref="filterSearch" />

    <el-table :data="dataReactive.tableData" style="width: 100%">
      <el-table-column align="center" fixed="left" prop="title" label="Tiêu đề" width="200" />
      <el-table-column align="center" label="Ảnh" width="260">
        <template #default="scope">
          <img :src="scope.row.img" class="img-table" alt="" srcset="" />
        </template>
      </el-table-column>
      <el-table-column align="center" prop="author" label="Tác giả" width="200" />
      <el-table-column align="center" label="Mô tả ngắn" width="180">
        <template #default="scope">
          <span
            class="text-primary cursor-pointer"
            @click="openDialogDescription(scope.row.short_description, 'Mô tả ngắn')"
          >
            <i><u>Xem mô tả ngắn</u></i></span
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
          <div class="d-flex">
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
                <span>Xóa sản phẩm</span>
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

    <DialogDefaultComponent
      :data="dataDeleteDialog"
      @closeDialog="closeDialogDelete"
      @submitDialog="submitDialogDelete"
    />
    <DialogDefaultComponent :data="dataDescriptionDialog" @closeDialog="closeDialogDescription" />
  </div>
</template>

<style lang="scss" scoped>
.img-table {
  width: 180;
  height: 170px;
  object-fit: cover;
}
</style>

<script setup lang="ts">
import FilterSearchNewsComponent from './filter-search/FilterSearchNewsComponent.vue'
import { formatNumberMoney } from '@/constant/constant'
import moment from 'moment'
import { onMounted, reactive, ref } from 'vue'
import DialogDefaultComponent from '../dialog-constant/DialogDefaultComponent.vue'
import { deleteProductApi, getListProducts } from '@/api/product'
import { ElMessage } from 'element-plus'
import type { TProduct } from '@/api/product/data'
import { deleteNewsApi, getListNewsApi } from '@/api/news'
import type { TGetNewsResponse } from '@/api/news/data'

type TDataReactive = {
  tableData: TGetNewsResponse[]
  page: number | string
  count: number | string
  querySearch: any
}

const dataReactive = reactive<TDataReactive>({
  tableData: [],
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

const dataDescriptionDialog = reactive({
  width: '50%',
  isOpenDialog: false,
  title: '',
  content: '',
  isLoading: false,
  btnConfirm: '',
  id: '',
  hideBtnSubmit: true
})

const openDialogDescription = (description: string, title: string) => {
  dataDescriptionDialog.title = title
  dataDescriptionDialog.content = description
  dataDescriptionDialog.isOpenDialog = true
}

const closeDialogDescription = () => {
  dataDescriptionDialog.isOpenDialog = false
}

const closeDialogDelete = () => {
  dataDeleteDialog.isOpenDialog = false
}

const submitDialogDelete = async () => {
  dataDeleteDialog.isLoading = true
  const [res, error] = await deleteNewsApi(dataDeleteDialog.id)
  dataDeleteDialog.isLoading = false
  if (res) {
    ElMessage({
      message: 'Xóa tin tức thành công',
      type: 'success',
      duration: 800
    })
    await handleGetListNews({ page: 1, limit: 10 })
  } else {
    ElMessage({
      message: 'Xóa tin tức không thành công',
      type: 'error',
      duration: 800
    })
  }
  dataDeleteDialog.isOpenDialog = false
}

const openDialogDelete = (id: string) => {
  dataDeleteDialog.isOpenDialog = true
  dataDeleteDialog.id = id
}

const filterSearch = ref<any>(null)

const handleGetListNews = async (query?: any) => {
  const [res, error] = await getListNewsApi(query)
  if (res) {
    const { data, page, count } = res.data
    dataReactive.tableData = data
    dataReactive.page = Number(page)
    dataReactive.count = count
  }
}

const searchListNews = async (querySearch: any) => {
  dataReactive.querySearch = querySearch
  await handleGetListNews(querySearch)
  filterSearch.value.handleSetIsLoading()
}

const handleChangePage = async (page: number) => {
  await handleGetListNews({ ...dataReactive.querySearch, ...{ page, limit: 10 } })
}

onMounted(async () => {
  await handleGetListNews({ page: 1, limit: 10 })
})
</script>
