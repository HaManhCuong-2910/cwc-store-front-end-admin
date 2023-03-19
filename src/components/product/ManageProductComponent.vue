<template>
  <div>
    <FilterSearchProductComponent @searchListProduct="searchListProduct" ref="filterSearch" />

    <el-table :data="dataReactive.tableData" style="width: 100%">
      <el-table-column align="center" fixed="left" prop="name" label="Tên sản phẩm" width="200" />
      <el-table-column align="center" label="Ảnh sản phẩm" width="170">
        <template #default="scope">
          <img :src="scope.row.images[0]" class="img-table" alt="" srcset="" />
        </template>
      </el-table-column>
      <el-table-column align="center" label="Giá SP" width="180">
        <template #default="scope">
          <span>{{ formatNumberMoney(scope.row.price) }} VNĐ</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="sales_percent" label="Giảm giá" width="100">
        <template #default="scope">
          <span>{{ scope.row.sales_percent }} %</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Giá sau giảm" width="160">
        <template #default="scope">
          <span>{{ formatNumberMoney(scope.row.sales) }} VNĐ</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="is_hot" label="SP nổi bật" width="100">
        <template #default="scope">
          <div v-if="scope.row.is_hot">
            <font-awesome-icon
              icon="fa-solid fa-circle-check"
              style="font-size: 16px"
              class="color-custom-primary"
            />
          </div>
          <div v-else></div>
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
            <a-tooltip placement="top">
              <template #title>
                <span>Xem chi tiết</span>
              </template>
              <span class="action-col mr-2">
                <font-awesome-icon :class="`color-custom-success`" icon="fa-solid fa-circle-info" />
              </span>
            </a-tooltip>
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
            <a-tooltip placement="top">
              <template #title>
                <span>Xóa sản phẩm</span>
              </template>
              <span class="action-col mr-2">
                <font-awesome-icon :class="`color-custom-danger`" icon="fa-regular fa-trash-can" />
              </span>
            </a-tooltip>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style lang="scss" scoped>
.img-table {
  width: 152px;
  height: 150px;
}
</style>

<script setup lang="ts">
import FilterSearchProductComponent from './filter-search/FilterSearchProductComponent.vue'
import { formatNumberMoney } from '@/constant/constant'
import moment from 'moment'
import { onMounted, reactive, ref } from 'vue'
import { getListProducts } from '@/api/product'

const dataReactive = reactive({
  tableData: [],
  page: '',
  count: '',
  querySearch: {}
})

const filterSearch = ref<any>(null)

const handleGetListProduct = async (query?: any) => {
  const [res, error] = await getListProducts(query)
  if (res) {
    const { data, page, count } = res.data
    dataReactive.tableData = data
    dataReactive.page = page
    dataReactive.count = count
  }
}

const searchListProduct = async (querySearch: any) => {
  await handleGetListProduct(querySearch)
  filterSearch.value.handleSetIsLoading()
}

onMounted(async () => {
  await handleGetListProduct({ page: 1, limit: 10 })
})
</script>
