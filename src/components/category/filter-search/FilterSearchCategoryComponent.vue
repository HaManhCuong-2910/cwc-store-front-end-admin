<template>
  <div class="row mb-5">
    <div class="col-3">
      <el-input
        class="custom-input-filter"
        v-model="name"
        placeholder="Nhập tên danh mục"
        autocomplete="off"
      />
    </div>

    <div>
      <el-button
        size="large"
        type="primary"
        :icon="Search"
        @click="SearchCategory"
        :loading="isLoading"
        >Tìm kiếm</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { removeEmptyValueInObject } from '@/constant/constant'

const name = ref<string>('')
const emit = defineEmits(['searchListCategory'])
const isLoading = ref<boolean>(false)

const SearchCategory = () => {
  isLoading.value = true
  emit(
    'searchListCategory',
    removeEmptyValueInObject({
      name: name.value
    })
  )
}

const handleSetIsLoading = () => {
  isLoading.value = false
}

defineExpose({ handleSetIsLoading })
</script>
