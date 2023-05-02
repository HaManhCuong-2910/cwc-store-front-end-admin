<template>
  <component :is="data.layout">
    <router-view v-slot="{ Component, route }">
      <transition :name="route.meta.transition as string || ''">
        <component :is="Component" />
      </transition>
    </router-view>
  </component>
</template>

<style>
.slither-enter-active,
.slither-leave-active {
  transition: transform 0.4s;
}

.slither-enter,
.slither-leave-to {
  transform: translateY(100%);
}

.slither-enter-to,
.slither-leave {
  transform: translateY(0);
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>

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
