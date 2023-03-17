<template>
  <div class="layout-container" id="wrapper">
    <ContainerDefaultLayout>
      <template #body>
        <slot />
      </template>
    </ContainerDefaultLayout>
  </div>
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
import ContainerDefaultLayout from './container/ContainerDefaultLayout.vue'
</script>
