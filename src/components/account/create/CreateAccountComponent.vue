<template>
  <div class="container">
    <el-form
      label-position="top"
      ref="formCreateAccountRef"
      :rules="rules"
      :model="formCreateAccount"
      size="large"
    >
      <div class="row">
        <div class="col-3">
          <el-form-item label="Họ và tên" prop="name">
            <el-input
              class="custom-input-filter"
              v-model="formCreateAccount.name"
              placeholder="Nhập Họ và tên"
            />
          </el-form-item>
        </div>
        <div class="col-3">
          <el-form-item label="Email" prop="email">
            <el-input
              class="custom-input-filter"
              v-model="formCreateAccount.email"
              placeholder="Nhập Email"
            />
          </el-form-item>
        </div>
        <div class="col-3">
          <el-form-item label="Số điện thoại" prop="phoneNumber">
            <el-input
              class="custom-input-filter"
              type="number"
              v-model="formCreateAccount.phoneNumber"
              placeholder="Nhập số điện thoại"
            />
          </el-form-item>
        </div>
        <div class="col-3">
          <el-form-item label="Loại tài khoản" prop="type">
            <el-select
              v-model="formCreateAccount.type"
              label="loại tài khoản"
              class="w-100 custom-input-filter"
              placeholder="--Chọn loại tài khoản"
              :clearable="true"
            >
              <el-option
                v-for="item in listTypeOption"
                :key="item?.key"
                :label="item?.value"
                :value="item?.key"
              />
            </el-select>
          </el-form-item>
        </div>
      </div>
      <div class="row">
        <div class="col-3">
          <ProvinceInput
            :classCustom="'account-custom'"
            :province_id="formCreateAccount.province_id"
            @setProvince="setProvince"
          />
        </div>
        <div class="col-3">
          <DistrictInput
            :classCustom="'account-custom'"
            :province_id="formCreateAccount.province_id"
            :district_id="formCreateAccount.district_id"
            @setDistrict="setDistrict"
          />
        </div>
        <div class="col-6">
          <el-form-item label="Địa chỉ" prop="address">
            <el-input
              class="custom-input-filter"
              v-model="formCreateAccount.address"
              placeholder="Nhập địa chỉ"
            />
          </el-form-item>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <el-form-item label="Ảnh đại diện" prop="img">
            <el-upload
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
      </div>
      <div class="row">
        <div class="col-3">
          <el-form-item label="Mật khẩu" prop="password">
            <el-input
              class="custom-input-filter"
              v-model="formCreateAccount.password"
              type="password"
              show-password
              placeholder="Nhập mật khẩu"
              :autocomplete="'new-password'"
            />
          </el-form-item>
        </div>
        <div class="col-5">
          <el-form-item label="Trạng thái" prop="status">
            <div class="d-flex">
              <el-select
                v-model="formCreateAccount.status"
                label="trạng thái"
                class="w-100 custom-input-filter"
                placeholder="--Chọn trạng thái"
                :clearable="true"
              >
                <el-option
                  v-for="item in listStatusOption"
                  :key="item?.key"
                  :label="item?.value"
                  :value="item?.key"
                />
              </el-select>
              <el-button
                type="primary"
                class="ml-4"
                @click="dataRolesAccountDialog.isOpenDialog = true"
                plain
                >Thêm quyền</el-button
              >
            </div>
          </el-form-item>
        </div>
      </div>

      <el-form-item class="w-100 mt-5">
        <el-button :loading="isLoading" class="m-auto" type="danger" @click="onSubmit"
          >Tạo mới</el-button
        >
      </el-form-item>
    </el-form>
  </div>

  <DialogRolesAccountComponent
    :data="dataRolesAccountDialog"
    @closeDialog="closeDialogRoles"
    @setRolesChecked="setRolesChecked"
  />
</template>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<script lang="ts" setup>
import {
  listStatusOption,
  listTypeOption,
  type IDataAccount,
  type TCreateAccountForm
} from '@/api/account/data'
import { Plus } from '@element-plus/icons-vue'
import ProvinceInput from '@/components/location/ProvinceInput.vue'
import DistrictInput from '@/components/location/DistrictInput.vue'
import { onMounted, reactive, ref } from 'vue'
import DialogRolesAccountComponent, {
  type TListRoles
} from '../dialog-roles-account/DialogRolesAccountComponent.vue'
import { ElMessage, type FormRules, type UploadProps } from 'element-plus'
import { createAccountApi, getListRolesApi } from '@/api/account'
import { validatePhoneNumber } from '@/constant/constant'
import { uploadFileToCloud } from '@/api/cloudinary'
import router from '@/router'
const formCreateAccountRef = ref<any>(null)
type TDataRolesAccountDialog = {
  isOpenDialog: boolean
  listRoles: TListRoles[]
  account: IDataAccount | null
}

const dataRolesAccountDialog = reactive<TDataRolesAccountDialog>({
  isOpenDialog: false,
  listRoles: [],
  account: null
})

const isLoading = ref<boolean>(false)

const closeDialogRoles = () => {
  dataRolesAccountDialog.isOpenDialog = false
}

const formCreateAccount = ref<TCreateAccountForm>({
  name: '',
  email: '',
  phoneNumber: '',
  password: '',
  status: '',
  avatar: '',
  roles: [],
  address: '',
  type: '',
  province_id: '',
  district_id: '',
  public_id_avatar: ''
})

const setRolesChecked = (listCheckedRoles: string[]) => {
  formCreateAccount.value.roles = listCheckedRoles
}

const rules = reactive<FormRules>({
  name: [
    {
      required: true,
      message: 'Vui lòng nhập Họ và tên',
      trigger: 'blur'
    }
  ],
  email: [
    {
      required: true,
      message: 'Vui lòng nhập email',
      trigger: 'blur'
    }
  ],
  phoneNumber: [
    {
      required: true,
      validator: validatePhoneNumber,
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: 'Vui lòng nhập mật khẩu',
      trigger: 'blur'
    }
  ],
  province_id: [
    {
      required: true,
      message: 'Vui lòng chọn tỉnh/thành phố',
      trigger: 'change'
    }
  ],
  district_id: [
    {
      required: true,
      message: 'Vui lòng chọn quận/huyện',
      trigger: 'change'
    }
  ],
  type: [
    {
      required: true,
      message: 'Vui lòng chọn loại tài khoản',
      trigger: 'change'
    }
  ],
  status: [
    {
      required: true,
      message: 'Vui lòng chọn trạng thái',
      trigger: 'change'
    }
  ]
})

const setProvince = (id: number) => {
  formCreateAccount.value.province_id = id
}
const setDistrict = (id: number) => {
  formCreateAccount.value.district_id = id
}
const previewImage = ref<string>('')
const handleChangeImg: UploadProps['onChange'] = (uploadFile, uploadFiles) => {
  formCreateAccount.value.avatar = uploadFile.raw as File
  previewImage.value = URL.createObjectURL(uploadFile.raw!)
}

onMounted(async () => {
  const [res, error] = await getListRolesApi()
  if (res) {
    const { data } = res.data
    dataRolesAccountDialog.listRoles = data
  }
})

const onSubmit = async () => {
  await formCreateAccountRef.value.validate(async (valid: any, fields: any) => {
    if (valid) {
      isLoading.value = true
      const { avatar, public_id_avatar, ...dataSubmit } = formCreateAccount.value
      let newAvatar = avatar,
        newPublicIdAvatar = public_id_avatar
      if (avatar && typeof avatar !== 'string') {
        const [res, err] = await uploadFileToCloud(avatar as File)
        if (res) {
          const { secure_url, public_id } = res
          newAvatar = secure_url
          newPublicIdAvatar = public_id
        }
        if (err) {
          ElMessage({
            message: err,
            type: 'error',
            duration: 800
          })
          isLoading.value = false
          return
        }
      }

      const bodySubmit = { avatar: newAvatar, public_id_avatar: newPublicIdAvatar, ...dataSubmit }

      const [res, err] = await createAccountApi(bodySubmit)
      if (res) {
        const { success } = res.data
        if (success === 200) {
          ElMessage({
            message: 'Tạo mới thành công',
            type: 'success',
            duration: 800
          })
          isLoading.value = false
          router.push({ name: 'ManageAccount' })
        }
      }
      if (err) {
        ElMessage({
          message: err,
          type: 'error',
          duration: 800
        })
        isLoading.value = false
      }
    }
  })
}
</script>
