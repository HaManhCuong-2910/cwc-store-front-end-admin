<template>
  <div>
    <HeaderOrderComponent />

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
            <router-link
              :to="{
                name: 'OrderDetail',
                params: {
                  slug: scope.row._id
                }
              }"
            >
              <el-tooltip class="box-item" effect="dark" content="Xem chi tiết" placement="top">
                <span class="action-col">
                  <font-awesome-icon
                    :class="`color-custom-primary`"
                    icon="fa-regular fa-pen-to-square"
                  />
                </span>
              </el-tooltip>
            </router-link>

            <el-tooltip
              class="box-item"
              effect="dark"
              content="Hủy đơn hàng"
              placement="top"
              v-if="scope.row.status === EStatusOrder.PICKUP_PRODUCT"
            >
              <span
                class="action-col cursor-pointer ml-3"
                @click="openDialogConfirmCancel(scope.row._id)"
              >
                <font-awesome-icon :class="`color-custom-danger`" icon="fa-solid fa-ban" />
              </span>
            </el-tooltip>
          </div>
        </template>
      </el-table-column>
    </el-table>
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
  </div>
</template>

<script setup lang="ts">
import { getListOrder } from '@/api/order'
import moment from 'moment'
import { onMounted, reactive, watch } from 'vue'
import { EStatusOrder, type DataOrderItem, type IDataOrderResponse } from './data'
import HeaderOrderComponent from './header-order/HeaderOrderComponent.vue'
import { LStatusOrder } from './data'
import type { TDefaultObject } from '@/constant/constant'
import { formatNumberMoney } from '@/constant/constant'
import DialogProductsOrder from './dialog-products/DialogProductsOrder.vue'
import DialogConfirmCancelComponent from './dialog-confirm-cancel/DialogConfirmCancelComponent.vue'
import router from '@/router'
import { useRoute } from 'vue-router'

const dataReactive = reactive({
  tableData: [],
  page: 1,
  count: 0,
  countRecord: 0,
  dataDialog: [] as DataOrderItem[],
  isOpenDialog: false,
  orderIDCancel: '',
  isOpenCancelDialog: false
})

const route = useRoute()

const handleGetListOrder = async (query: any) => {
  const [res, error] = await getListOrder(query)

  if (res) {
    const { data, page, count, countRecord } = res.data
    dataReactive.tableData = data
  }
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

const resetListOrder = async () => {
  await handleGetListOrder({ status: EStatusOrder.CANCEL, not_equal: true })
}

const openDialogConfirmCancel = (orderID: string) => {
  dataReactive.orderIDCancel = orderID
  dataReactive.isOpenCancelDialog = true
}
</script>
