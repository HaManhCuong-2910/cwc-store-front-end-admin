<template>
  <el-form-item
    label="Tỉnh/Thành"
    prop="province_id"
    class="w-100"
    :class="props.classCustom || 'd-flex align-items-center mb-0'"
  >
    <el-autocomplete
      :disabled="props.isDisable"
      v-model="data.valueProvince"
      :fetch-suggestions="querySearch"
      clearable
      class="w-100 custom-input-filter"
      placeholder="Nhập tỉnh / thành"
      @select="handleSelectProvince"
      @change="handleChangeProvince"
    />
  </el-form-item>
</template>

<style lang="scss" scoped>
::v-deep .el-form-item__label {
  margin-bottom: 0px;
}
</style>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { getProvinces } from '@/api/location/index'
import type { TDataLocation } from '@/constant/constant'

interface PropsType {
  province_id: string | number
  isDisable?: boolean
  classCustom?: string
}

export default defineComponent({
  props: ['province_id', 'classCustom', 'isDisable'],
  emits: ['setProvince'],
  setup(props: PropsType, { emit }) {
    const data = reactive({
      valueProvince: ''
    })
    const ListProvinces = ref([])

    const handleSelectProvince = (item: TDataLocation) => {
      data.valueProvince = item.value
      emit('setProvince', item.link)
    }

    const handleChangeProvince = (item) => {
      data.valueProvince = ''
      emit('setProvince', '')
    }

    const handleGetProvince = async () => {
      const resultProvinces = await (await getProvinces()).data
      return resultProvinces.map((item: any) => {
        return {
          value: item.ProvinceName,
          link: item.ProvinceID
        }
      })
    }

    const querySearch = (queryString: string, cb: any) => {
      const results = queryString
        ? ListProvinces.value.filter(createFilter(queryString))
        : ListProvinces.value
      cb(results)
    }
    const createFilter = (queryString: string) => {
      return (ListProvinces: TDataLocation) => {
        return ListProvinces.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
      }
    }

    onMounted(async () => {
      const result = await handleGetProvince()
      ListProvinces.value = result
      data.valueProvince = result.find(
        (item: TDataLocation) => item.link === props.province_id
      )?.value
    })

    return {
      props,
      data,
      handleSelectProvince,
      querySearch,
      handleChangeProvince
    }
  }
})
</script>
