<template>
  <div class="row">
    <div class="col-md-6 d-flex align-items-center">
      <a-input-group compact>
        <a-select v-model:value="menuSearchActive">
          <a-select-option v-for="item in menuSearch" :value="item.key">{{
            item.value
          }}</a-select-option>
        </a-select>
        <a-input v-model:value="valueSearch" class="w-75" />
      </a-input-group>
    </div>
    <div class="col-md-3 d-flex align-items-center">
      <ProvinceInput :province_id="province_id" @setProvince="setProvince" />
    </div>
    <div class="col-md-3 d-flex align-items-center">
      <DistrictInput
        :province_id="province_id"
        :district_id="district_id"
        @setDistrict="setDistrict"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ProvinceInput from '@/components/location/ProvinceInput.vue'
import DistrictInput from '@/components/location/DistrictInput.vue'

const menuSearch = [
  {
    key: 'name',
    value: 'Họ và tên'
  },
  {
    key: 'phoneNumber',
    value: 'Số điện thoại'
  }
]

const menuSearchActive = ref<string>(menuSearch[0].key)
const valueSearch = ref<string>('')
const province_id = ref<number | string>('')
const district_id = ref<number | string>('')

const setProvince = (id: number) => {
  province_id.value = id
}
const setDistrict = (id: number) => {
  district_id.value = id
}
</script>
