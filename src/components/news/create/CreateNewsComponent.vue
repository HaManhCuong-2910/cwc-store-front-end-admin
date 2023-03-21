<template>
  <div
    class="container"
    v-if="
      props.typeScreen === ETypeScreen.CREATE ||
      ((props.typeScreen === ETypeScreen.UPDATE || props.typeScreen === ETypeScreen.DETAIL) &&
        props.detailNews?._id)
    "
  >
    <el-form label-position="top" ref="formCreateNewsRef" :model="formCreateNews" size="large">
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
          <el-form-item label="Mô tả chi tiết" class="d-block" prop="description">
            <div class="w-100">
              <QuillEditor
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

<script lang="ts" setup>
import type { ICreateNewsDto } from '@/api/news/data'
import { ETypeScreen } from '@/constant/constant'
import ImageUploader from 'quill-image-uploader'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { defineComponent, reactive, ref, type PropType } from 'vue'
import { uploadFileToCloud } from '@/api/cloudinary'
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

const onSubmit = async () => {
  await formCreateNewsRef.value.validate(async (valid: any, fields: any) => {
    if (valid) {
      console.log('formCreateNews.value', formCreateNews.value)
    }
  })
}
</script>
