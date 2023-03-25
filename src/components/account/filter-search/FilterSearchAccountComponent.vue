<template>
  <div class="text-right mb-4">
    <el-button size="large" type="danger" :icon="CirclePlus" @click="redirectCreateAccount"
      >Tạo mới</el-button
    >
  </div>
  <div class="row">
    <div class="col-md-3 d-flex align-items-center">
      <a-input-group compact class="w-100 d-flex custom-input-group">
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
        class="w-100 custom-input-filter"
        placeholder="Trạng thái"
        :clearable="true"
      >
        <el-option
          v-for="item in listStatusOption"
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

<script lang="ts" setup>
import { ref } from 'vue'
import ProvinceInput from '@/components/location/ProvinceInput.vue'
import DistrictInput from '@/components/location/DistrictInput.vue'
import { Search, CirclePlus } from '@element-plus/icons-vue'
import { listStatusOption, type EStatusAccount } from '@/api/account/data'
import { removeEmptyValueInObject } from '@/constant/constant'
import router from '@/router'
const statusValue = ref<EStatusAccount | ''>('')

const menuSearch = [
  {
    key: 'name',
    value: 'Họ và tên'
  },
  {
    key: 'email',
    value: 'Email'
  },
  {
    key: 'phoneNumber',
    value: 'Số điện thoại'
  }
]

const valueSearch = ref<string>('')
const menuSearchActive = ref<string>(menuSearch[0].key)
const province_id = ref<number | string>('')
const district_id = ref<number | string>('')
const isLoading = ref<boolean>(false)
const emit = defineEmits(['searchListAccount'])
const setProvince = (id: number) => {
  province_id.value = id
}
const setDistrict = (id: number) => {
  district_id.value = id
}

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
  emit('searchListAccount', removeEmptyValueInObject(querySearch))
}

const handleSetFalseIsLoading = () => {
  isLoading.value = false
}
defineExpose({ handleSetFalseIsLoading })

const redirectCreateAccount = () => {
  router.push({
    name: 'CreateAccount'
  })
}
</script>
