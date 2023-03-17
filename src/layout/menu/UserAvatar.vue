<template>
  <a
    class="nav-link dropdown-toggle"
    id="userDropdown"
    role="button"
    data-toggle="dropdown"
    aria-haspopup="true"
    aria-expanded="false"
  >
    <span class="mr-2 d-none d-lg-inline text-gray-600">{{ user.name }}</span>
    <img class="img-profile rounded-circle" :src="user.avatar ? user.avatar : ''" />
  </a>
  <!-- Dropdown - User Information -->
  <div
    class="dropdown-menu dropdown-menu-right shadow animated--grow-in"
    aria-labelledby="userDropdown"
  >
    <a class="dropdown-item">
      <font-awesome-icon icon="fa-solid fa-user mr-2 text-gray-400" />
      Thông tin các nhân
    </a>
    <div class="dropdown-divider"></div>
    <a class="dropdown-item" @click="LogoutUser">
      <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket mr-2 text-gray-400" />
      Đăng xuất
    </a>
  </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex'
import { useCookies } from 'vue3-cookies'
import router from '@/router'
import { Logout } from '@/api/auth'

const store = useStore()
const { cookies } = useCookies()
const { user } = store.state

const LogoutUser = async () => {
  const [res, err] = await Logout()

  if (res) {
    cookies.remove('access_token')
    store.commit('logOut')
    router.push({ name: 'LoginPage' })
  } else {
    console.log('err', err)
  }
}
</script>
