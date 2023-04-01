<template>
  <div>
    <CreateAccountComponent :typeScreen="ETypeScreen.CREATE" />
  </div>
</template>

<script lang="ts" setup>
import CreateAccountComponent from '@/components/account/create/CreateAccountComponent.vue'
import { ETypeScreen } from '@/constant/constant'
</script>
