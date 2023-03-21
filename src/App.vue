<template>
  <component :is="data.layout">
    <RouterView></RouterView>
  </component>
  <!-- Scroll to Top Button-->
  <a
    class="scroll-to-top rounded d-flex justify-content-center align-items-center"
    style="z-index: 1000"
    href="#page-top"
  >
    <font-awesome-icon :icon="['fas', 'arrow-up']" />
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
