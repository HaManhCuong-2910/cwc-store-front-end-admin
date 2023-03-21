<template>
  <div><CreateNewsComponent :typeScreen="ETypeScreen.CREATE" /></div>
</template>

<script lang="ts" setup>
import CreateNewsComponent from '@/components/news/create/CreateNewsComponent.vue'
import { ETypeScreen } from '@/constant/constant'
</script>
