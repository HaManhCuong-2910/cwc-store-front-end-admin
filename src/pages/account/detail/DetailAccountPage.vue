<template>
  <CreateAccountComponent :detailAccount="detailAccount" :typeScreen="ETypeScreen.DETAIL" />
</template>

<script lang="ts" setup>
import CreateAccountComponent from '@/components/account/create/CreateAccountComponent.vue'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { ETypeScreen } from '@/constant/constant'
import { getDetailAccountApi } from '@/api/account'
const route = useRoute()
const detailAccount = ref(null)

onMounted(async () => {
  const [res, err] = await getDetailAccountApi(route.params.id as string)
  if (res) {
    detailAccount.value = res.data
  }
})
</script>
