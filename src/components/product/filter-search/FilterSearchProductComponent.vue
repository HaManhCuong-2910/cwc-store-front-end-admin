<template>
  <div class="text-right mr-5 mb-4">
    <el-button size="large" type="danger" :icon="CirclePlus" @click="redirectCreateProduct"
      >Tạo mới</el-button
    >
  </div>
  <div class="row mb-5">
    <div class="col-3">
      <SearchNameProductComponent :name="data.name" @changeName="changeName" />
    </div>

    <div>
      <el-button
        size="large"
        type="primary"
        :icon="Search"
        @click="SearchProduct"
        :loading="isLoading"
        >Tìm kiếm</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { Search, CirclePlus } from '@element-plus/icons-vue'
import SearchNameProductComponent from './autocomplate-search-name/SearchNameProductComponent.vue'
import router from '@/router'

const data = reactive({
  name: ''
})
const emit = defineEmits(['searchListProduct'])
const isLoading = ref<boolean>(false)

const changeName = (newName: string) => {
  data.name = newName
}

const SearchProduct = () => {
  isLoading.value = true
  emit('searchListProduct', { name: data.name })
}

const handleSetIsLoading = () => {
  isLoading.value = false
}

const redirectCreateProduct = () => {
  router.push({
    name: 'CreateProduct'
  })
}

defineExpose({ handleSetIsLoading })
</script>
