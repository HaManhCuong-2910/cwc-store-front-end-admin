<template>
  <el-autocomplete
    v-model="nameRef"
    :fetch-suggestions="querySearch"
    clearable
    :debounce="400"
    class="input-custom custom-input-filter w-100"
    placeholder="nhập tên sản phẩm"
    @select="handleSelectName"
    @blur="handleBlur"
  >
    <template #prefix>
      <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
    </template>
  </el-autocomplete>
</template>

<script setup lang="ts">
import { getListProducts, type TProduct } from '@/api/product'
import { onMounted, ref } from 'vue'

interface ProductsItem {
  value: string
  link: string
}

const props = defineProps({
  name: String
})

const emit = defineEmits(['changeName'])

const nameRef = ref('')
const products = ref<ProductsItem[]>([])

const handleSearch = (name: string) => {
  nameRef.value = name
  emit('changeName', nameRef.value)
}

const handleSelectName = (item: ProductsItem) => {
  handleSearch(item.value)
}

const handleBlur = (event: any) => {
  handleSearch(event.target.value)
}

const querySearch = async (queryString: string, cb: any) => {
  const [res, err] = await getListProducts({
    page: 1,
    limit: 5,
    name: queryString
  })
  const results = res.data.data
    ? res.data.data.map((item: TProduct) => {
        return {
          value: item.name,
          link: item._id
        }
      })
    : products.value
  cb(results)
}
const loadAll = async () => {
  const [res, err] = await getListProducts({ page: 1, limit: 5 })
  const { data } = res.data
  return data.map((item: TProduct) => {
    return {
      value: item.name,
      link: item._id
    }
  })
}

onMounted(async () => {
  products.value = await loadAll()
})
</script>
