<template>
  <component :is="data.layout">
    <RouterView></RouterView>
  </component>
  <!-- Scroll to Top Button-->
  <a class="scroll-to-top rounded" href="#page-top">
    <i class="fas fa-angle-up"></i>
  </a>
</template>

<style>
@import '@/assets/css/sb-admin-2.min.css';
@import '@/assets/css/base.css';
</style>

<script setup lang="ts">
import { onMounted, reactive, watch } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
const route = useRoute()

const data = reactive({
  layout: ''
})
watch(
  () => route.name,
  () => {
    data.layout = route.meta.layout as any
  }
)
</script>
