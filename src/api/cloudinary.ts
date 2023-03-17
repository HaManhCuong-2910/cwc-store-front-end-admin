import axios from 'axios'

const cloudinaryInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_TOKEN_BASE_CLOUDINARY_URL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export const uploadFileToCloud = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append(
    'upload_preset',
    import.meta.env.VITE_APP_TOKEN_CLOUDINARY_UPLOAD_PRESET as string
  )
  try {
    const res = (await cloudinaryInstance.post('/', formData)).data
    return [res, null]
  } catch (error) {
    return [null, error]
  }
}
