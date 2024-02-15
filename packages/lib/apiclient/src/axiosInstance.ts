import Axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'

const axios = Axios.create()
axios.defaults.headers.common.Accept = 'application/json'
axios.defaults.baseURL = ''

export const setAxiosConfig = (configModifierFn: (axiosInstance: AxiosInstance) => unknown) => {
  configModifierFn(axios)
}

export const customInstance = async <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  return await axios({
    ...config,
    ...options
  })
}

export default customInstance
