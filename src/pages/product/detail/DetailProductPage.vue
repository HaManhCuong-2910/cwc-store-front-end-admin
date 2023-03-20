<template>
  <CreateProductComponent :detailProduct="detailProduct" :typeScreen="ETypeScreen.DETAIL" />
</template>

<script lang="ts" setup>
import { getDetailProduct } from '@/api/product'
import CreateProductComponent from '@/components/product/create/CreateProductComponent.vue'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { ETypeScreen } from '@/constant/constant'
const route = useRoute()
const detailProduct = ref(null)

onMounted(async () => {
  const [res, err] = await getDetailProduct({ slug: route.params.slug as string })
  if (res) {
    const { category, images, name, ...filterData } = res.data
    detailProduct.value = {
      ...filterData,
      name,
      category: category._id,
      images: images.map((item: string, index: number) => {
        return {
          name: `Ảnh sản phẩm ${name} ${index + 1}`,
          url: item
        }
      })
    }
  }
})
</script>
