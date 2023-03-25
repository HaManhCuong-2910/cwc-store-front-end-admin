<template>
  <el-form-item
    label="Quận/Huyện"
    prop="district_id"
    :class="props.classCustom || 'd-flex align-items-center mb-0'"
    class="w-100"
  >
    <el-autocomplete
      v-model="data.valueDistrict"
      :fetch-suggestions="querySearch"
      class="w-100 custom-input-filter"
      clearable
      placeholder="Nhập quận / huyện"
      @select="handleSelectDistrict"
      @change="handleChangeDistrict"
    />
  </el-form-item>
</template>

<style lang="scss" scoped>
::v-deep .el-form-item__label {
  margin-bottom: 0px;
}
</style>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, watch } from 'vue'
import { getDistrict } from '@/api/location/index'
import type { TDataLocation } from '@/constant/constant'

interface PropsType {
  province_id: string | number
  district_id: string | number
  classCustom?: string
}

export default defineComponent({
  props: ['province_id', 'district_id', 'classCustom'],
  emits: ['setDistrict'],
  setup(props: PropsType, { emit }) {
    const data = reactive({
      valueDistrict: '',
      isDisable: true
    })
    const ListDistrict = ref<TDataLocation[]>([])

    const handleSelectDistrict = (item: TDataLocation) => {
      data.valueDistrict = item.value
      emit('setDistrict', item.link)
    }

    const handleChangeDistrict = (item) => {
      data.valueDistrict = ''
      emit('setDistrict', '')
    }

    const handleGetDistrict = async (province_id: string | number) => {
      const result = await (await getDistrict(province_id)).data
      return result.map((item: any) => {
        return {
          value: item.DistrictName,
          link: item.DistrictID
        }
      })
    }

    const handleSetDistrict = (district_id: number | string) => {
      data.valueDistrict = ListDistrict.value.find(
        (item: TDataLocation) => item.link === district_id
      )?.value as string
    }

    const querySearch = (queryString: string, cb: any) => {
      const results = queryString
        ? ListDistrict.value.filter(createFilter(queryString))
        : ListDistrict.value
      cb(results)
    }
    const createFilter = (queryString: string) => {
      return (ListDistrict: TDataLocation) => {
        return ListDistrict.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
      }
    }

    watch(
      () => props.province_id,
      async (value) => {
        data.valueDistrict = ''
        emit('setDistrict', '')
        ListDistrict.value = []
        ListDistrict.value = await handleGetDistrict(value)
        data.isDisable = false
      }
    )

    onMounted(async () => {
      if (props.province_id) {
        data.valueDistrict = ''
        emit('setDistrict', '')
        ListDistrict.value = []
        ListDistrict.value = await handleGetDistrict(props.province_id)
        data.isDisable = false
      }

      if (props.district_id) {
        handleSetDistrict(props.district_id)
      }
    })

    return {
      props,
      data,
      handleSelectDistrict,
      querySearch,
      handleChangeDistrict
    }
  }
})
</script>
