<template>
  <div class="text-right mr-5 mb-4">
    <el-button size="large" type="danger" :icon="CirclePlus" @click="redirectCreateNews"
      >Tạo mới</el-button
    >
  </div>
  <div class="row mb-5">
    <div class="col-3">
      <a-input-group compact class="w-100 d-flex custom-input-group">
        <a-select v-model:value="menuSearchActive">
          <a-select-option v-for="item in menuSearch" :value="item.key">{{
            item.value
          }}</a-select-option>
        </a-select>
        <a-input v-model:value="valueSearch" />
      </a-input-group>
    </div>

    <div>
      <el-button size="large" type="primary" :icon="Search" @click="SearchNews" :loading="isLoading"
        >Tìm kiếm</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { Search, CirclePlus } from '@element-plus/icons-vue'
import router from '@/router'

const menuSearch = [
  {
    key: 'title',
    value: 'Tiêu đề'
  },
  {
    key: 'author',
    value: 'Tác giả'
  }
]

const menuSearchActive = ref<string>(menuSearch[0].key)

const valueSearch = ref<string>('')

const data = reactive({
  name: ''
})
const emit = defineEmits(['searchListNews'])
const isLoading = ref<boolean>(false)

const SearchNews = () => {
  isLoading.value = true
  let searchWithKey: any = {}
  let querySearch: any
  if (valueSearch.value !== '') {
    searchWithKey[menuSearchActive.value] = valueSearch.value
  }

  querySearch = {
    ...searchWithKey
  }
  emit('searchListNews', querySearch)
}

const handleSetIsLoading = () => {
  isLoading.value = false
}

const redirectCreateNews = () => {
  router.push({
    name: 'CreateNews'
  })
}

defineExpose({ handleSetIsLoading })
</script>
