<template>
  <div>
    <FilterSearchCategoryComponent @searchListCategory="searchListCategory" ref="filterSearch" />

    <el-table
      v-loading="dataReactive.isLoadingTable"
      :data="dataReactive.tableData"
      style="width: 100%"
    >
      <el-table-column align="center" fixed="left" label="Tên Danh Mục">
        <template #default="scope">
          <input
            type="text"
            class="custom-input-default"
            :value="scope.row.name"
            @blur="(event: FocusEvent)=> updateCategoryName(event,scope.row._id,scope.$index)"
          />
        </template>
      </el-table-column>
      <el-table-column align="center" label="Ngày tạo">
        <template #default="scope">
          <span>{{ moment(scope.row.createdAt).format('DD/MM/YYYY hh:mm') }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Ngày cập nhật">
        <template #default="scope">
          <span>{{ moment(scope.row.updatedAt).format('DD/MM/YYYY hh:mm') }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Thao tác">
        <template #default="scope">
          <a-tooltip placement="top">
            <template #title>
              <span>Xóa danh mục</span>
            </template>
            <span class="action-col cursor-pointer m-auto" @click="openDialogDelete(scope.row._id)">
              <font-awesome-icon :class="`color-custom-danger`" icon="fa-regular fa-trash-can" />
            </span>
          </a-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-button class="mt-4" type="primary" plain @click="onAddItem">Thêm mới</el-button>

    <DialogDefaultComponent
      :data="dataDeleteDialog"
      @closeDialog="closeDialogDelete"
      @submitDialog="submitDialogDelete"
    />
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
import FilterSearchCategoryComponent from './filter-search/FilterSearchCategoryComponent.vue'
import moment from 'moment'
import { onMounted, reactive, ref } from 'vue'
import DialogDefaultComponent from '../dialog-constant/DialogDefaultComponent.vue'
import { ElMessage } from 'element-plus'
import { deleteNewsApi } from '@/api/news'
import type { IGetCategoriesResponse } from '@/api/category/data'
import { deleteCategoryApi, getListCategories, updateCategory } from '@/api/category'
import { genderSlugFromString } from '@/constant/constant'
import { number } from 'yup'

type TDataReactive = {
  tableData: IGetCategoriesResponse[]
  isLoadingTable: boolean
}

const dataReactive = reactive<TDataReactive>({
  tableData: [],
  isLoadingTable: false
})

const onAddItem = () => {
  dataReactive.tableData.push({
    _id: '',
    name: '',
    slug: '',
    parent: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    isCategoryProduct: true,
    __v: 0
  })
}

const defaultQuery = {
  isCategoryProduct: true
}

const dataDeleteDialog = reactive({
  width: '28%',
  isOpenDialog: false,
  title: 'Xác nhận xóa danh mục',
  content: 'Bạn chắc chắn muốn xóa danh mục này?',
  isLoading: false,
  btnConfirm: 'Xác nhận xóa',
  id: ''
})

const updateCategoryName = async (event: any, id: string, indexMenu: number) => {
  const oldValue = dataReactive.tableData.find(
    (item: any, index: number) => index === indexMenu
  )?.name
  if (oldValue !== event.target.value) {
    const data = {
      name: event.target.value,
      slug: genderSlugFromString(event.target.value),
      ...defaultQuery,
      id
    }

    const [res, error] = await updateCategory(data)
    if (res && res.data.status === 200) {
      ElMessage({
        message: 'Cập nhật thành công',
        type: 'success',
        duration: 800
      })
      await handleGetListCategory()
    } else {
      ElMessage({
        message: error,
        type: 'error',
        duration: 800
      })
    }
  }
}

const closeDialogDelete = () => {
  dataDeleteDialog.isOpenDialog = false
}

const submitDialogDelete = async () => {
  dataDeleteDialog.isLoading = true
  if (dataDeleteDialog.id) {
    const [res, error] = await deleteCategoryApi(dataDeleteDialog.id)
    dataDeleteDialog.isLoading = false
    dataDeleteDialog.isOpenDialog = false
    if (res) {
      ElMessage({
        message: 'Xóa danh mục thành công',
        type: 'success',
        duration: 800
      })
      await handleGetListCategory()
    } else {
      ElMessage({
        message: 'Xóa danh mục không thành công',
        type: 'error',
        duration: 800
      })
    }
  } else {
    dataReactive.tableData.splice(dataReactive.tableData.length - 1, 1)
    dataDeleteDialog.isLoading = false
    dataDeleteDialog.isOpenDialog = false
  }
}

const openDialogDelete = (id: string) => {
  dataDeleteDialog.isOpenDialog = true
  dataDeleteDialog.id = id
}

const filterSearch = ref<any>(null)

const handleGetListCategory = async (query?: any) => {
  dataReactive.isLoadingTable = true
  const [res, error] = await getListCategories({ ...defaultQuery, ...query })
  if (res) {
    dataReactive.tableData = res.data
    dataReactive.isLoadingTable = false
  }
}

const searchListCategory = async (querySearch: any) => {
  await handleGetListCategory(querySearch)
  filterSearch.value.handleSetIsLoading()
}

onMounted(async () => {
  await handleGetListCategory()
})
</script>
