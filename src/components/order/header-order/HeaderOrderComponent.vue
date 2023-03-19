<template>
  <div class="row">
    <div class="col-md-3 d-flex align-items-center">
      <a-input-group compact class="w-100 d-flex">
        <a-select v-model:value="menuSearchActive">
          <a-select-option v-for="item in menuSearch" :value="item.key">{{
            item.value
          }}</a-select-option>
        </a-select>
        <a-input v-model:value="valueSearch" />
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
    <div class="col-md-3 d-flex align-items-center">
      <el-select
        v-model="statusValue"
        label="Trạng thái"
        class="w-100"
        placeholder="Trạng thái"
        :clearable="true"
      >
        <el-option
          v-for="item in LStatusOrder"
          :key="item.key"
          :label="item.value"
          :value="item.key"
        />
      </el-select>
    </div>
  </div>
  <div class="d-flex justify-content-end mt-4">
    <el-button size="large" type="primary" :icon="Search" @click="SearchList" :loading="isLoading"
      >Tìm kiếm</el-button
    >
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import ProvinceInput from '@/components/location/ProvinceInput.vue'
import DistrictInput from '@/components/location/DistrictInput.vue'
import { removeEmptyValueInObject } from '@/constant/constant'
import type { EStatusOrder } from '../data'
import { LStatusOrder } from '../data'

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
const isLoading = ref<boolean>(false)
const statusValue = ref<EStatusOrder | ''>('')

const setProvince = (id: number) => {
  province_id.value = id
}
const setDistrict = (id: number) => {
  district_id.value = id
}

const emit = defineEmits(['searchListOrder'])

const SearchList = () => {
  isLoading.value = true
  let searchWithKey: any = {}
  let querySearch: any
  if (valueSearch.value !== '') {
    searchWithKey[menuSearchActive.value] = valueSearch.value
  }

  querySearch = {
    ...searchWithKey,
    province: province_id.value,
    district: district_id.value,
    status: statusValue.value
  }
  emit('searchListOrder', removeEmptyValueInObject(querySearch))
}

const handleSetFalseIsLoading = () => {
  isLoading.value = false
}
defineExpose({ handleSetFalseIsLoading })
</script>
