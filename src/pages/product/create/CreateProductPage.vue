<template>
  <CreateProductComponent :typeScreen="ETypeScreen.CREATE" />
</template>

<script lang="ts" setup>
import { ETypeScreen } from '@/constant/constant'
import CreateProductComponent from '@/components/product/create/CreateProductComponent.vue'
</script>
