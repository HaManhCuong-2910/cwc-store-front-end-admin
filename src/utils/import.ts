import router from '@/router'
import 'ant-design-vue/dist/antd.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import '@/utils/LoadingRouter'
import '@/utils/configAuth'
import Antd from 'ant-design-vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { setupInterceptors } from '@/api/setupInterceptors'
import store from '@/store'
import VueCookies from 'vue3-cookies'
import { QuillEditor } from '@vueup/vue-quill'
import VueApexCharts from 'vue3-apexcharts'

library.add(fas, fab, far)
export function registerGlobalComponent(app: any) {
  setupInterceptors(store, router)
  app
    .use(store)
    .use(router)
    .use(Antd)
    .use(ElementPlus)
    .use(VueApexCharts)
    .use(VueCookies, { expires: '30d' })
    .component('QuillEditor', QuillEditor)
    .component('font-awesome-icon', FontAwesomeIcon)

  app.mount('#app')
}
