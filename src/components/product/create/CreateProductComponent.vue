<template>
  <div class="container">
    <el-form
      label-position="top"
      ref="formCreateProductRef"
      :model="formCreateProduct"
      size="large"
    >
      <div class="row">
        <div class="col-3">
          <el-form-item label="Tên sản phẩm" prop="name">
            <el-input
              class="custom-input-filter"
              v-model="formCreateProduct.name"
              placeholder="Nhập tên sản phẩm"
              autocomplete="off"
            />
          </el-form-item>
        </div>
        <div class="col-3">
          <el-form-item label="Giá sản phẩm" prop="price">
            <el-input
              class="custom-input-filter"
              type="number"
              v-model="formCreateProduct.price"
              placeholder="Nhập giá sản phẩm"
              autocomplete="off"
            />
          </el-form-item>
        </div>
        <div class="col-3">
          <el-form-item label="Khuyến mãi" prop="sales_percent">
            <el-input
              class="custom-input-filter"
              v-model="formCreateProduct.sales_percent"
              placeholder="Nhập tỉ lệ khuyến mãi"
              type="number"
              autocomplete="off"
            />
          </el-form-item>
        </div>

        <div class="col-3">
          <el-form-item label="Danh mục" prop="sales_percent">
            <el-input
              class="custom-input-filter"
              v-model="formCreateProduct.sales_percent"
              placeholder="Nhập tỉ lệ khuyến mãi"
              type="number"
              autocomplete="off"
            />
          </el-form-item>
        </div>

        <div class="col-12">
          <el-form-item label="SP nổi bật">
            <el-switch v-model="formCreateProduct.is_hot" />
          </el-form-item>
        </div>
        <div class="col-12">
          <el-form-item label="Mô tả sản phẩm" prop="description">
            <el-input
              class="custom-input-filter"
              type="textarea"
              v-model="formCreateProduct.description"
              placeholder="Nhập mô tả sản phẩm"
              rows="5"
              resize="none"
            />
          </el-form-item>
        </div>
        <div class="col-12">
          <el-form-item label="Ảnh sản phẩm" prop="">
            <el-upload
              multiple
              v-model:file-list="fileList"
              action="#"
              list-type="picture-card"
              :auto-upload="false"
              :on-change="handleChangeFiles"
              :on-remove="handleRemove"
            >
              <el-icon><Plus /></el-icon>
            </el-upload>
          </el-form-item>
        </div>
      </div>

      <el-form-item class="w-100">
        <el-button :loading="isLoading" class="m-auto" type="danger" @click="onSubmit"
          >Tạo mới</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import type { UploadProps, UploadUserFile } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { reactive, ref, watch } from 'vue'

const formCreateProduct = reactive({
  name: '',
  description: '',
  category: '',
  price: '',
  sales: '',
  sales_percent: 0,
  is_hot: false,
  slug: '',
  images: [],
  quantities: []
})

const fileList = ref<UploadUserFile[]>([
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
  }
])

let filesRaw: any[] = []

const isLoading = ref<boolean>(false)

const handleChangeFiles: UploadProps['onChange'] = (uploadFile, uploadFiles) => {
  filesRaw.push({
    name: uploadFile.name,
    url: uploadFile.raw,
    uid: uploadFile.uid
  })
  console.log('filesRaw', filesRaw)
}
const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log('uploadFile', uploadFile)
  const indexRemoveFile = filesRaw.findIndex((item: any) => item.uid === uploadFile.uid)
  if (indexRemoveFile) {
    filesRaw.splice(indexRemoveFile, 1)
  }
}

const formCreateProductRef = ref<any>(null)

const onSubmit = () => {
  console.log('submit', formCreateProduct)
}
</script>
