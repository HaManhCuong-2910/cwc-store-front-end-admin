<template>
  <div><CreateNewsComponent :typeScreen="ETypeScreen.UPDATE" :detailNews="detailNews" /></div>
</template>

<script lang="ts" setup>
import CreateNewsComponent from '@/components/news/create/CreateNewsComponent.vue'
import { ETypeScreen } from '@/constant/constant'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getDetailNews } from '@/api/news'
const route = useRoute()
const detailNews = ref(null)

onMounted(async () => {
  const [res, err] = await getDetailNews(route.params.id as string)
  if (res) {
    detailNews.value = res.data
  }
})
</script>
