import axios from 'axios'

const locationInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_LOCATION_END_POINT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Token: import.meta.env.VITE_APP_TOKEN_GET_LOCATION
  }
})

export const getProvinces = async () => {
  return await (
    await locationInstance.get('/province')
  ).data
}

export const getDistrict = async (province_id: number | string) => {
  return await (
    await locationInstance.get('/district', {
      params: {
        province_id
      }
    })
  ).data
}
