<template>
  <section class="vh-100">
    <div class="container-fluid h-custom">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-md-9 col-lg-6 col-xl-5">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            class="img-fluid"
            alt="Sample image"
          />
        </div>
        <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
          <div class="banner-login-page text-center mb-5">
            <p class="m-0">CWC STORE ADMIN</p>
          </div>
          <form>
            <!-- Email input -->
            <div class="form-outline mb-4">
              <label class="form-label" for="email">Email</label>
              <input
                type="email"
                id="email"
                class="form-control form-control-lg"
                placeholder="Nhập địa chỉ email"
                v-model="formData.email"
                @blur="validate('email')"
                :class="errors.email && 'is-invalid'"
              />
              <p class="invalid-feedback" v-if="errors.email">
                {{ errors.email }}
              </p>
            </div>

            <!-- Password input -->
            <div class="form-outline mb-3">
              <label class="form-label" for="password">Mật khẩu</label>
              <input
                type="password"
                id="password"
                class="form-control form-control-lg"
                placeholder="Nhập mật khẩu"
                v-model="formData.password"
                @blur="validate('password')"
                :class="errors.password && 'is-invalid'"
              />
              <p class="invalid-feedback" v-if="errors.password">
                {{ errors.password }}
              </p>
            </div>

            <div class="text-center text-lg-start mt-4 pt-2">
              <button
                type="button"
                @click="onSubmitForm"
                :disabled="isLoading"
                class="btn btn-danger btn-lg"
                style="padding-left: 2.5rem; padding-right: 2.5rem"
              >
                Đăng nhập
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.divider:after,
.divider:before {
  content: '';
  flex: 1;
  height: 1px;
  background: #eee;
}
.h-custom {
  height: calc(100% - 73px);
}
@media (max-width: 450px) {
  .h-custom {
    height: 100%;
  }
}

.banner-login-page {
  background-color: #c0392b;
  padding: 20px 10px;
  border-radius: 8px;
  margin: auto;

  p {
    color: #fff;
    font-size: 1.3rem;
    font-weight: 600;
  }
}
</style>

<script setup lang="ts">
import { Login } from '@/api/auth'
import { timeExpireAccessToken } from '@/constant/constant'
import router from '@/router'
import { ElMessage } from 'element-plus'
import { inject, reactive, ref } from 'vue'
import { useCookies } from 'vue3-cookies'
import { useStore } from 'vuex'
import * as yup from 'yup'
interface IFormLogin {
  email: string
  password: string
}

enum EFieldDataForm {
  email = 'email',
  password = 'password'
}

const formData = reactive<IFormLogin>({
  email: '',
  password: ''
})

const errors = reactive<IFormLogin>({
  email: '',
  password: ''
})

const isLoading = ref<boolean>(false)

const loginFormSchema = yup.object().shape({
  email: yup.string().required('Email là bắt buộc').email('Email sai định dạng'),
  password: yup.string().required('Password bắt buộc nhập')
})

const validate = (field: 'email' | 'password') => {
  loginFormSchema
    .validateAt(field, formData)
    .then(() => {
      errors[field] = ''
    })
    .catch((err: any) => {
      errors[field] = err.message
    })
}

const store = useStore()
const { cookies } = useCookies()

const onSubmitForm = (e: any) => {
  e.preventDefault()
  loginFormSchema.validate(formData, { abortEarly: false }).then(async () => {
    isLoading.value = true
    const [res, err] = await Login(formData)
    if (res) {
      const { access_token, user } = res.data
      cookies.set('access_token', access_token, timeExpireAccessToken)
      store.commit('setUserData', user)
      ElMessage({
        message: 'Đăng nhập thành công',
        type: 'success',
        duration: 1000
      })
      router.push({ path: '/' })
    } else {
      ElMessage({
        message: 'Đăng nhập thất bại',
        type: 'error',
        duration: 1000
      })
    }
    isLoading.value = false
  })
}
</script>
