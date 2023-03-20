<template>
  <div>
    <HeaderOrderComponent @searchListOrder="handleSearchListOrder" ref="headerOrderEl" />

    <el-table
      :empty-text="'Không có dữ liệu'"
      :data="dataReactive.tableData"
      stripe
      class="w-100 mt-5"
    >
      <el-table-column fixed="left" align="center" prop="name" label="Họ và tên" width="150" />
      <el-table-column align="center" prop="phoneNumber" label="Số điện thoại" width="150" />
      <el-table-column align="center" label="Sản phẩm đặt" width="150">
        <template #default="scope">
          <span class="text-primary cursor-pointer" @click="openDialogProducts(scope.row.data)">
            <i><u>Xem sản phẩm</u></i></span
          >
        </template>
      </el-table-column>
      <el-table-column align="center" label="Giá" width="150">
        <template #default="scope">
          <span>{{ formatNumberMoney(scope.row.price) }} VNĐ</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Trạng thái" width="150">
        <template #default="scope">
          <span
            :class="`font-weight-bold color-custom-${LStatusOrder.find((item: TDefaultObject) => item.key === Number(scope.row.status))?.class}`"
            >{{
              LStatusOrder.find((item: TDefaultObject) => item.key === Number(scope.row.status))
                ?.value
            }}</span
          >
        </template>
      </el-table-column>
      <el-table-column align="center" prop="createdAt" label="Ngày đặt hàng" width="250">
        <template #default="scope">
          <span>{{ moment(scope.row.createdAt).format('DD/MM/YYYY hh:mm') }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="updatedAt" label="Ngày cập nhật" width="250">
        <template #default="scope">
          <span>{{ moment(scope.row.updatedAt).format('DD/MM/YYYY hh:mm') }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Thao tác" width="150" fixed="right">
        <template #default="scope">
          <div class="d-flex justify-content-center">
            <el-tooltip
              class="box-item"
              effect="dark"
              content="Đang vận chuyển"
              placement="top"
              v-if="scope.row.status === EStatusOrder.PICKUP_PRODUCT"
            >
              <span
                class="action-col cursor-pointer mr-1"
                @click="handleChangeStatusOrder(scope.row._id, EStatusOrder.DELIVERY)"
              >
                <font-awesome-icon icon="fa-solid fa-truck" :class="`color-custom-primary`" />
              </span>
            </el-tooltip>
            <el-tooltip
              class="box-item"
              effect="dark"
              content="Đã nhận hàng"
              placement="top"
              v-if="scope.row.status === EStatusOrder.DELIVERY"
            >
              <span
                class="action-col cursor-pointer mr-1"
                @click="handleChangeStatusOrder(scope.row._id, EStatusOrder.RECEIVED)"
              >
                <font-awesome-icon
                  icon="fa-solid fa-circle-check"
                  :class="`color-custom-success`"
                />
              </span>
            </el-tooltip>

            <el-tooltip
              class="box-item"
              effect="dark"
              content="Hủy đơn hàng"
              placement="top"
              v-if="scope.row.status === EStatusOrder.PICKUP_PRODUCT"
            >
              <span
                class="action-col cursor-pointer ml-1"
                @click="openDialogConfirmCancel(scope.row._id)"
              >
                <font-awesome-icon :class="`color-custom-danger`" icon="fa-solid fa-ban" />
              </span>
            </el-tooltip>

            <el-tooltip
              class="box-item"
              effect="dark"
              content="Xóa đơn hàng"
              placement="top"
              v-if="scope.row.status === EStatusOrder.CANCEL"
            >
              <span
                class="action-col cursor-pointer ml-3"
                @click="openDialogDeleteOrder(scope.row._id)"
              >
                <font-awesome-icon icon="fa-regular fa-trash-can" :class="`color-custom-danger`" />
              </span>
            </el-tooltip>
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
    <DialogProductsOrder
      :data="dataReactive.dataDialog"
      :isOpenDialog="dataReactive.isOpenDialog"
      @closeDialog="closeDialog"
    />
    <DialogConfirmCancelComponent
      :id="dataReactive.orderIDCancel"
      :isOpenDialog="dataReactive.isOpenCancelDialog"
      @resetListOrder="resetListOrder"
      @closeDialog="closeCancelDialog"
    />

    <DialogDefaultComponent
      :data="dataDeleteDialog"
      @closeDialog="closeDialogDelete"
      @submitDialog="submitDialogDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { ChangeStatusOrder, getListOrder, removeOrder } from '@/api/order'
import moment from 'moment'
import { onMounted, reactive, ref, watch } from 'vue'
import { EStatusOrder, type DataOrderItem, type IDataOrderResponse } from './data'
import HeaderOrderComponent from './header-order/HeaderOrderComponent.vue'
import { LStatusOrder } from './data'
import type { TDefaultObject } from '@/constant/constant'
import { formatNumberMoney } from '@/constant/constant'
import DialogProductsOrder from './dialog-products/DialogProductsOrder.vue'
import DialogConfirmCancelComponent from './dialog-confirm-cancel/DialogConfirmCancelComponent.vue'
import router from '@/router'
import { useRoute } from 'vue-router'
import DialogDefaultComponent from '../dialog-constant/DialogDefaultComponent.vue'
import { string } from 'yup'
import { ElMessage } from 'element-plus'

const dataReactive = reactive({
  tableData: [],
  page: 1,
  count: 0,
  countRecord: 0,
  dataDialog: [] as DataOrderItem[],
  isOpenDialog: false,
  orderIDCancel: '',
  isOpenCancelDialog: false,
  querySearch: {}
})

const dataDeleteDialog = reactive({
  width: '28%',
  isOpenDialog: false,
  title: 'Xác nhận xóa đơn hàng',
  content: 'Bạn chắc chắn muốn xóa đơn hàng này?',
  isLoading: false,
  btnConfirm: 'Xác nhận hủy',
  id: ''
})

const handleChangePage = async (page: number) => {
  if (route.meta.typeOrder === 'cancel') {
    await handleGetListOrder({
      status: EStatusOrder.CANCEL,
      ...dataReactive.querySearch,
      ...{ page, limit: 10 }
    })
  } else {
    await handleGetListOrder({
      status: EStatusOrder.CANCEL,
      not_equal: true,
      ...{ page, limit: 10 },
      ...dataReactive.querySearch
    })
  }
}

const headerOrderEl = ref<any>(null)

const route = useRoute()

const handleGetListOrder = async (query: any) => {
  const [res, error] = await getListOrder(query)

  if (res) {
    const { data, page, count, countRecord } = res.data
    dataReactive.tableData = data
    dataReactive.page = Number(page)
    dataReactive.count = count
  }
}

const handleSearchListOrder = async (querySearch: any) => {
  dataReactive.querySearch = querySearch
  if (route.meta.typeOrder === 'cancel') {
    await handleGetListOrder({ status: EStatusOrder.CANCEL, ...querySearch })
  } else {
    await handleGetListOrder({ status: EStatusOrder.CANCEL, not_equal: true, ...querySearch })
  }
  headerOrderEl.value.handleSetFalseIsLoading()
}

watch(
  () => route.name,
  async () => {
    if (route.meta.typeOrder === 'cancel') {
      await handleGetListOrder({ status: EStatusOrder.CANCEL })
    } else {
      await handleGetListOrder({ status: EStatusOrder.CANCEL, not_equal: true })
    }
  }
)

onMounted(async () => {
  if (route.meta.typeOrder === 'cancel') {
    await handleGetListOrder({ status: EStatusOrder.CANCEL })
  } else {
    await handleGetListOrder({ status: EStatusOrder.CANCEL, not_equal: true })
  }
})

const openDialogProducts = (dataDialog: DataOrderItem[]) => {
  dataReactive.dataDialog = dataDialog
  dataReactive.isOpenDialog = true
}

const closeDialog = () => {
  dataReactive.isOpenDialog = false
}
const closeCancelDialog = () => {
  dataReactive.isOpenCancelDialog = false
}

const openDialogDeleteOrder = (id: string) => {
  dataDeleteDialog.isOpenDialog = true
  dataDeleteDialog.id = id
}

const closeDialogDelete = () => {
  dataDeleteDialog.isOpenDialog = false
}

const submitDialogDelete = async () => {
  dataDeleteDialog.isLoading = true
  const [res, error] = await removeOrder(dataDeleteDialog.id)
  dataDeleteDialog.isLoading = false
  if (res) {
    ElMessage({
      message: 'Xóa đơn hàng thành công',
      type: 'success',
      duration: 800
    })
    await handleGetListOrder({ status: EStatusOrder.CANCEL })
  } else {
    ElMessage({
      message: 'Xóa đơn hàng không thành công',
      type: 'error',
      duration: 800
    })
  }
  dataDeleteDialog.isOpenDialog = false
}

const resetListOrder = async () => {
  await handleGetListOrder({ status: EStatusOrder.CANCEL, not_equal: true })
}

const openDialogConfirmCancel = (orderID: string) => {
  dataReactive.orderIDCancel = orderID
  dataReactive.isOpenCancelDialog = true
}

const handleChangeStatusOrder = async (orderID: string, status: EStatusOrder) => {
  const [res, err] = await ChangeStatusOrder({
    id: orderID,
    status
  })
  if (res) {
    ElMessage({
      message: 'Cập nhật đơn hàng thành công',
      type: 'success',
      duration: 800
    })
    await handleGetListOrder({ status: EStatusOrder.CANCEL, not_equal: true })
  }
}
</script>
