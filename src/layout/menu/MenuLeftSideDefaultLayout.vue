<template>
  <a-menu
    class="w-100 menu-left-side"
    theme="dark"
    mode="inline"
    v-model:openKeys="state.openKeys"
    v-model:selectedKeys="state.selectedKeys"
  >
    <template :key="itemSubMenu.path" v-for="itemSubMenu in menuCWC">
      <template v-if="itemSubMenu.child">
        <a-sub-menu :key="itemSubMenu.path">
          <template #icon><component :is="itemSubMenu.icon"></component></template>
          <template #title>{{ itemSubMenu.name }}</template>

          <a-menu-item :key="item.path" v-for="item in itemSubMenu.child">
            <router-link :to="item.path">
              {{ item.name }}
            </router-link></a-menu-item
          >
        </a-sub-menu>
      </template>
      <template v-else>
        <a-menu-item :key="itemSubMenu.path">
          <template #icon><component :is="itemSubMenu.icon"></component></template>
          <router-link :to="itemSubMenu.path">
            {{ itemSubMenu.name }}
          </router-link>
        </a-menu-item>
      </template>
    </template>
  </a-menu>
</template>

<style lang="scss">
.menu-left-side {
  background-color: transparent !important;

  .ant-menu-item-selected {
    background-color: #c0392b !important;
  }

  .ant-menu-sub {
    background-color: transparent !important;
  }
}
</style>

<script setup lang="ts">
import { onMounted, reactive, watch } from 'vue'
import { menuCWC } from '@/constant/menu'
import { useRoute } from 'vue-router'

const state = reactive({
  openKeys: ['/'],
  selectedKeys: ['/']
})

const route = useRoute()

onMounted(() => {
  state.selectedKeys = [route.path]
  if (route.path.length > 2) {
    const newArr = route.path.split('/')
    state.openKeys = [[newArr[0], newArr[1]].join('/')]
  } else {
    state.openKeys = [route.path]
  }
})
</script>
