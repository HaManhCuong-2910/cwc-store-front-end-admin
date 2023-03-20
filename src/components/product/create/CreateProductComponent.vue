<template>
  <div
    class="container"
    v-if="
      props.typeScreen === ETypeScreen.CREATE ||
      ((props.typeScreen === ETypeScreen.UPDATE || props.typeScreen === ETypeScreen.DETAIL) &&
        props.detailProduct?.name)
    "
  >
    <el-form
      label-position="top"
      :rules="rules"
      ref="formCreateProductRef"
      :model="formCreateProduct"
      size="large"
    >
      <div class="row">
        <div class="col-3">
          <el-form-item label="Tên sản phẩm" prop="name">
            <el-input
              :disabled="props.typeScreen === ETypeScreen.DETAIL"
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
              :disabled="props.typeScreen === ETypeScreen.DETAIL"
              class="custom-input-filter"
              :formatter="(value: string) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
              :parser="(value: string) => value.replace(/\$\s?|(,*)/g, '')"
              v-model="formCreateProduct.price"
              placeholder="Nhập giá sản phẩm"
              autocomplete="off"
            />
          </el-form-item>
        </div>
        <div class="col-3">
          <el-form-item label="Khuyến mãi (%)" prop="sales_percent">
            <el-input
              :disabled="props.typeScreen === ETypeScreen.DETAIL"
              class="custom-input-filter"
              v-model="formCreateProduct.sales_percent"
              placeholder="Nhập tỉ lệ khuyến mãi"
              type="number"
              autocomplete="off"
            />
          </el-form-item>
        </div>

        <div class="col-3">
          <el-form-item label="Danh mục" prop="category">
            <el-select
              :disabled="props.typeScreen === ETypeScreen.DETAIL"
              v-model="formCreateProduct.category"
              label="Danh mục"
              class="w-100 custom-input-filter"
              placeholder="--Chọn danh mục"
              :clearable="true"
            >
              <el-option
                v-for="item in ListCategories"
                :key="item?.key"
                :label="item?.value"
                :value="item?.key"
              />
            </el-select>
          </el-form-item>
        </div>

        <div class="col-12">
          <div class="row">
            <div class="col-3">
              <el-form-item label="SP nổi bật">
                <el-switch
                  :disabled="props.typeScreen === ETypeScreen.DETAIL"
                  v-model="formCreateProduct.is_hot"
                />
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="col-12">
          <el-form-item label="Mô tả sản phẩm" prop="description">
            <el-input
              :disabled="props.typeScreen === ETypeScreen.DETAIL"
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
          <el-form-item label="Ảnh sản phẩm" prop="images">
            <el-upload
              :disabled="props.typeScreen === ETypeScreen.DETAIL"
              multiple
              v-model:file-list="formCreateProduct.images"
              action="#"
              list-type="picture-card"
              :auto-upload="false"
            >
              <el-icon><Plus /></el-icon>
            </el-upload>
          </el-form-item>
        </div>
        <div class="col-6">
          <el-form-item
            v-for="(item, index) in formCreateProduct.quantities"
            :key="index"
            :label="'Kích cỡ'"
            :prop="'quantities.' + index + '.size'"
            :rules="{
              required: true,
              message: 'Kích cỡ không được bỏ trống',
              trigger: 'blur'
            }"
          >
            <el-input
              :disabled="props.typeScreen === ETypeScreen.DETAIL"
              class="custom-input-filter"
              v-model="item.size"
              type="number"
              placeholder="Nhập kích cỡ sản phẩm"
            />
          </el-form-item>
        </div>
        <div class="col-6">
          <el-form-item
            v-for="(item, index) in formCreateProduct.quantities"
            :key="index"
            :label="'Số lượng'"
            :prop="'quantities.' + index + '.quantity'"
            :rules="{
              required: true,
              message: 'Số lượng không được bỏ trống',
              trigger: 'blur'
            }"
          >
            <div class="d-flex align-items-center w-100">
              <el-input
                :disabled="props.typeScreen === ETypeScreen.DETAIL"
                class="custom-input-filter"
                v-model="item.quantity"
                type="number"
                placeholder="Nhập số lượng sản phẩm"
              />
              <el-button class="ml-4" type="warning" plain @click="removeQuantity(item)"
                >Xóa</el-button
              >
            </div>
          </el-form-item>
        </div>
        <el-button
          v-if="props.typeScreen !== ETypeScreen.DETAIL"
          @click="addQuantity"
          type="primary"
          class="ml-3"
          plain
          >Thêm kích cỡ</el-button
        >
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
import { ElMessage, type FormRules, type UploadProps, type UploadUserFile } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { onMounted, reactive, ref, watch, type PropType } from 'vue'
import { getListCategories } from '@/api/category'
import type { IGetCategoriesResponse } from '@/api/category/data'
import { uploadFileToCloud, uploadMultipleFileToCloud } from '@/api/cloudinary'
import { createProductApi, updateProductApi } from '@/api/product'
import router from '@/router'
import { ETypeScreen, genderSlugFromString } from '@/constant/constant'
import type { ICreateProductDto } from '@/api/product/data'

const props = defineProps({
  detailProduct: { type: Object as PropType<ICreateProductDto | null>, required: false },
  typeScreen: { type: String as PropType<ETypeScreen>, required: false }
})

const formCreateProduct = ref<ICreateProductDto>({
  name: '',
  description: '',
  category: '',
  price: '',
  sales: '',
  sales_percent: 0,
  is_hot: false,
  slug: '',
  images: [],
  quantities: [
    {
      size: '',
      quantity: ''
    }
  ]
})

const rules = reactive<FormRules>({
  name: [
    {
      required: true,
      message: 'Vui lòng nhập họ và tên',
      trigger: 'blur'
    }
  ],
  description: [
    {
      required: true,
      message: 'Vui lòng nhập mô tả',
      trigger: 'blur'
    }
  ],
  category: [
    {
      required: true,
      message: 'Vui lòng chọn danh mục',
      trigger: 'blur'
    }
  ],
  price: [
    {
      required: true,
      message: 'Vui lòng nhập giá',
      trigger: 'blur'
    }
  ],
  sales_percent: [
    {
      required: true,
      message: 'Vui lòng nhập tỉ lệ giảm giá',
      trigger: 'blur'
    }
  ],
  images: [
    {
      required: true,
      message: 'Vui lòng chọn ảnh',
      trigger: 'blur'
    }
  ]
})

const ListCategories = ref<any>([])

const removeQuantity = (quantity: any) => {
  const index = formCreateProduct.value.quantities.indexOf(quantity)
  if (index !== -1) {
    formCreateProduct.value.quantities.splice(index, 1)
  }
}

watch(
  () => props.detailProduct,
  () => {
    formCreateProduct.value = {
      name: props.detailProduct?.name ? props.detailProduct?.name : '',
      description: props.detailProduct?.description ? props.detailProduct?.description : '',
      category: props.detailProduct?.category ? props.detailProduct?.category : '',
      price: props.detailProduct?.price
        ? props.detailProduct?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        : '',
      sales: props.detailProduct?.sales ? props.detailProduct?.sales : '',
      sales_percent: props.detailProduct?.sales_percent ? props.detailProduct?.sales_percent : 0,
      is_hot: props.detailProduct?.is_hot ? props.detailProduct?.is_hot : false,
      slug: props.detailProduct?.slug ? props.detailProduct?.slug : '',
      images: props.detailProduct?.images ? props.detailProduct?.images : [],
      quantities: props.detailProduct?.quantities
        ? props.detailProduct?.quantities
        : [
            {
              size: '',
              quantity: ''
            }
          ]
    }
  }
)

const addQuantity = () => {
  formCreateProduct.value.quantities.push({
    size: '',
    quantity: ''
  })
}

const isLoading = ref<boolean>(false)

onMounted(async () => {
  const [res, error] = await getListCategories({ isCategoryProduct: true })
  if (res) {
    ListCategories.value = res.data.map((item: IGetCategoriesResponse) => {
      return {
        key: item._id,
        value: item.name
      }
    })
  }
})

const formCreateProductRef = ref<any>(null)

const convertFileToUrlCloud = async (images: any[]) => {
  const imageHaveUrl = images
    .filter((item: any) => !item.raw)
    .map((containUrl: any) => containUrl.url)
  const imageHaveNotUrl = images.filter((item: any) => item.raw)
  const listFileToUpload = imageHaveNotUrl.map((item: any) => item.raw)
  const resultFileUpload = []
  if (listFileToUpload.length > 0) {
    for (let i = 0; i < listFileToUpload.length; i++) {
      const [res, error] = await uploadFileToCloud(listFileToUpload[i])
      if (res) {
        resultFileUpload.push(res.secure_url)
      } else {
        isLoading.value = false
        throw error
      }
    }
  }

  return [...imageHaveUrl, ...resultFileUpload]
}

const handleCreateProduct = async (data: ICreateProductDto) => {
  const [res, error] = await createProductApi(data)
  if (res) {
    const { status, message, data } = res.data

    if (status) {
      ElMessage({
        message: 'Tạo sản phẩm thành công',
        type: 'success',
        duration: 800
      })
      router.replace({ name: 'ManageProduct' })
    }
  } else {
    ElMessage({
      message: error,
      type: 'error',
      duration: 800
    })
  }
}

const handleUpdateProduct = async (data: ICreateProductDto) => {
  const [res, error] = await updateProductApi(data, props.detailProduct?._id as string)
  if (res) {
    const { status, message, data } = res.data

    if (status) {
      ElMessage({
        message: 'Cập nhật sản phẩm thành công',
        type: 'success',
        duration: 800
      })
      router.replace({ name: 'ManageProduct' })
    }
  } else {
    ElMessage({
      message: error,
      type: 'error',
      duration: 800
    })
  }
}

const onSubmit = async () => {
  await formCreateProductRef.value.validate(async (valid: any, fields: any) => {
    if (valid) {
      isLoading.value = true
      const { images, price, sales, sales_percent, slug, name, ...filterData } =
        formCreateProduct.value

      const newImages = await convertFileToUrlCloud(images)
      const newDataToSubmit = {
        ...filterData,
        price: Number(price.toString().replaceAll(',', '')),
        sales:
          (Number(price.toString().replaceAll(',', '')) * Number(100 - Number(sales_percent))) /
          100,
        sales_percent: Number(sales_percent),
        slug: genderSlugFromString(name),
        name,
        images: newImages
      }
      if (props.typeScreen === ETypeScreen.CREATE) {
        handleCreateProduct(newDataToSubmit)
      }

      if (props.typeScreen === ETypeScreen.UPDATE) {
        handleUpdateProduct(newDataToSubmit)
      }
      isLoading.value = false
    }
  })
}
</script>
