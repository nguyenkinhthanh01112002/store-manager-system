import axios, { AxiosError, AxiosResponse } from 'axios'
import { VITE_APP_API_URL } from '../config/env'

function handleSuccess(response: AxiosResponse) {
  return response?.data
}

function handleError(error: AxiosError) {
  return Promise.reject(error)
}

const api = axios.create({
  baseURL: VITE_APP_API_URL,
  headers: {
    'Content-type': 'application/json charset=utf-8'
  }
})

api.interceptors.request.use(
  async function (config: any) {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
api.interceptors.response.use(
  function (response) {
    return handleSuccess(response)
  },
  function (error) {
    return handleError(error)
  }
)

export default api
