<template>
  <div
    class="container"
    v-if="
      props.typeScreen === ETypeScreen.CREATE ||
      ((props.typeScreen === ETypeScreen.UPDATE || props.typeScreen === ETypeScreen.DETAIL) &&
        props.detailNews?._id)
    "
  >
    <el-form
      label-position="top"
      ref="formCreateNewsRef"
      :model="formCreateNews"
      :rules="rules"
      size="large"
    >
      <div class="row">
        <div class="col-12">
          <el-form-item label="Tiêu đề" prop="title">
            <el-input
              :disabled="props.typeScreen === ETypeScreen.DETAIL"
              class="custom-input-filter"
              v-model="formCreateNews.title"
              placeholder="Nhập tiêu đề"
              autocomplete="off"
            />
          </el-form-item>
        </div>
        <div class="col-12">
          <el-form-item label="Mô tả ngắn" prop="short_description">
            <el-input
              :disabled="props.typeScreen === ETypeScreen.DETAIL"
              class="custom-input-filter"
              type="textarea"
              v-model="formCreateNews.short_description"
              placeholder="Nhập mô tả ngắn"
              autocomplete="off"
              rows="5"
              resize="none"
            />
          </el-form-item>
        </div>
        <div class="col-12">
          <el-form-item label="Ảnh đại diện" prop="img">
            <el-upload
              :disabled="props.typeScreen === ETypeScreen.DETAIL"
              class="avatar-uploader"
              action="#"
              :auto-upload="false"
              :show-file-list="false"
              :on-change="handleChangeImg"
            >
              <img v-if="previewImage" :src="previewImage" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>
          </el-form-item>
        </div>
        <div class="col-12">
          <el-form-item label="Mô tả chi tiết" class="d-block" prop="description">
            <div class="w-100">
              <QuillEditor
                :readOnly="props.typeScreen === ETypeScreen.DETAIL"
                v-model:content="formCreateNews.description"
                contentType="html"
                :modules="modulesQuillImage"
                theme="snow"
                toolbar="full"
              />
            </div>
          </el-form-item>
        </div>
      </div>

      <el-form-item class="w-100">
        <el-button
          v-if="props.typeScreen !== ETypeScreen.DETAIL"
          :loading="isLoading"
          class="m-auto"
          type="danger"
          @click="onSubmit"
          >{{
            props.typeScreen === ETypeScreen.CREATE
              ? 'Tạo mới'
              : props.typeScreen === ETypeScreen.UPDATE
              ? 'Cập nhật'
              : ''
          }}</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<script lang="ts" setup>
import type { ICreateNewsDto } from '@/api/news/data'
import { ETypeScreen } from '@/constant/constant'
import ImageUploader from 'quill-image-uploader'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { Plus } from '@element-plus/icons-vue'
import { defineComponent, reactive, ref, watch, type PropType } from 'vue'
import { uploadFileToCloud } from '@/api/cloudinary'
import { ElMessage, type FormRules, type UploadProps } from 'element-plus'
import { createNewsApi, updateNewsApi } from '@/api/news'
import router from '@/router'
import { useStore } from 'vuex'
const props = defineProps({
  detailNews: { type: Object as PropType<ICreateNewsDto | null>, required: false },
  typeScreen: { type: String as PropType<ETypeScreen>, required: false }
})

const isLoading = ref<boolean>(false)

const formCreateNews = ref<ICreateNewsDto>({
  author: '',
  img: '',
  title: '',
  short_description: '',
  description: ''
})

const rules = reactive<FormRules>({
  title: [
    {
      required: true,
      message: 'Vui lòng nhập tiêu đề',
      trigger: 'blur'
    }
  ],
  short_description: [
    {
      required: true,
      message: 'Vui lòng nhập mô tả ngắn',
      trigger: 'blur'
    }
  ],
  description: [
    {
      required: true,
      message: 'Vui lòng nhập mô tả chi tiết',
      trigger: 'blur'
    }
  ]
})

const previewImage = ref<string>('')

watch(
  () => props.detailNews,
  () => {
    formCreateNews.value = {
      author: props.detailNews?.author ? props.detailNews?.author : '',
      img: props.detailNews?.img ? props.detailNews?.img : '',
      title: props.detailNews?.title ? props.detailNews?.title : '',
      short_description: props.detailNews?.short_description
        ? props.detailNews?.short_description
        : '',
      description: props.detailNews?.description ? props.detailNews?.description : ''
    }
    previewImage.value = (props.detailNews?.img ? props.detailNews?.img : '') as string
  }
)

const handleChangeImg: UploadProps['onChange'] = (uploadFile, uploadFiles) => {
  formCreateNews.value.img = uploadFile.raw as File
  previewImage.value = URL.createObjectURL(uploadFile.raw!)
}

const modulesQuillImage = {
  name: 'imageUploader',
  module: ImageUploader,
  options: {
    upload: (file: any) => {
      return new Promise(async (resolve, reject) => {
        const [res, error] = await uploadFileToCloud(file)
        if (res) {
          resolve(res.secure_url)
        } else {
          reject(error)
        }
      })
    }
  }
}

const formCreateNewsRef = ref<any>(null)

const handleCreateNew = async (data: ICreateNewsDto) => {
  const [res, error] = await createNewsApi(data)
  if (res) {
    const { status, message, data } = res.data

    if (status) {
      ElMessage({
        message: 'Tạo tin tức thành công',
        type: 'success',
        duration: 800
      })
      router.replace({ name: 'ManageNews' })
    }
  } else {
    ElMessage({
      message: error,
      type: 'error',
      duration: 800
    })
  }
}

const handleUpdateNew = async (data: ICreateNewsDto) => {
  const [res, error] = await updateNewsApi(data)
  if (res) {
    const { status, message, data } = res.data

    if (status) {
      ElMessage({
        message: 'Tạo tin tức thành công',
        type: 'success',
        duration: 800
      })
      router.replace({ name: 'ManageNews' })
    }
  } else {
    ElMessage({
      message: error,
      type: 'error',
      duration: 800
    })
  }
}

const store = useStore()
const { user } = store.state

const onSubmit = async () => {
  await formCreateNewsRef.value.validate(async (valid: any, fields: any) => {
    if (valid) {
      isLoading.value = true
      formCreateNews.value.author = user.name
      const { img, ...filterData } = formCreateNews.value
      let newImage: string | File = img

      if (typeof img === 'object') {
        const [res, error] = await uploadFileToCloud(img)
        if (res) {
          newImage = res.secure_url
        } else {
          isLoading.value = false
          throw error
        }
      }

      if (props.typeScreen === ETypeScreen.CREATE) {
        await handleCreateNew({ img: newImage, ...filterData })
      }

      if (props.typeScreen === ETypeScreen.UPDATE) {
        await handleUpdateNew({ _id: props.detailNews?._id, img: newImage, ...filterData })
      }

      isLoading.value = false
    }
  })
}
</script>
