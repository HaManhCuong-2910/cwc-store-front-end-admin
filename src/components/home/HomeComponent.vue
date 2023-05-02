<template>
  <div class="row container m-auto">
    <div class="col-4 my-3">
      <div class="padding-all-card contain-card">
        <div class="icon bgColor color1">
          <font-awesome-icon :icon="['far', 'user']" class="color1" />
        </div>
        <div class="card-content">
          <span>{{ data?.countAccounts }}</span>
          <p class="color1">Số lượng người dùng</p>
        </div>
      </div>
    </div>
    <div class="col-4 my-3">
      <div class="padding-all-card contain-card">
        <div class="icon bgColor color3">
          <font-awesome-icon :icon="['far', 'newspaper']" class="color3" />
        </div>
        <div class="card-content">
          <span>{{ data?.countNews }}</span>
          <p class="color3">Số lượng tin tức</p>
        </div>
      </div>
    </div>
    <div class="col-4 my-3">
      <div class="padding-all-card contain-card">
        <div class="icon bgColor color2">
          <font-awesome-icon :icon="['fas', 'cart-flatbed']" class="color2" />
        </div>
        <div class="card-content">
          <span>{{ data?.countOrders }}</span>
          <p class="color2">Số lượng đơn hàng</p>
        </div>
      </div>
    </div>
    <div class="col-4 my-3">
      <div class="padding-all-card contain-card">
        <div class="icon bgColor color4">
          <font-awesome-icon :icon="['fas', 'money-bill']" class="color4" />
        </div>
        <div class="card-content">
          <span>{{ formatNumberMoney(Number(data?.revenue_month)) }} VNĐ</span>
          <p class="color4">Doanh thu trong tháng</p>
        </div>
      </div>
    </div>
    <div class="col-4 my-3">
      <div class="padding-all-card contain-card">
        <div class="icon bgColor color5">
          <font-awesome-icon :icon="['fas', 'money-check-dollar']" class="color5" />
        </div>
        <div class="card-content">
          <span>{{ formatNumberMoney(Number(data?.revenue_years)) }} VNĐ</span>
          <p class="color5">Doanh thu trong năm</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.color1 {
  &.bgColor {
    background-color: #c7ecee;
  }
  color: #686de0;
}
.color2 {
  &.bgColor {
    background-color: #ffcccc;
  }
  color: #ff3838;
}
.color3 {
  &.bgColor {
    background-color: #fffa65;
  }
  color: #fd7272;
}
.color4 {
  &.bgColor {
    background-color: #f8efba;
  }
  color: #fd7272;
}
.color5 {
  &.bgColor {
    background-color: #4b4b4b;
  }
  color: #7158e2;
}
.padding-all-card {
  padding: 18px;
  &.contain-card {
    background-color: #fff;
    border-radius: 8px;
    display: flex;

    .icon {
      padding: 16px;
      border-radius: 8px;
      svg {
        font-size: 34px;
      }
    }

    .card-content {
      width: 100%;
      text-align: end;
      span {
        display: block;
        font-size: 26px;
        font-weight: 500;
      }
      p {
        margin-bottom: 0px;
        font-size: 16px;
      }
    }
  }
}
</style>

<script lang="ts" setup>
import { getStatisticalAll } from '@/api/statistical'
import type { TgetStatisticalAll } from '@/api/statistical/data'
import { formatNumberMoney } from '@/constant/constant'
import { onMounted, reactive, ref, watch } from 'vue'
const data = ref<TgetStatisticalAll>()
onMounted(async () => {
  const [res, err] = await getStatisticalAll()
  data.value = res.data
  console.log('data.value', data.value)
})
</script>
