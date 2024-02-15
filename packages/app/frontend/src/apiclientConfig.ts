import { setAxiosConfig } from 'apiclient'
import { getConfig } from './config.js'

setAxiosConfig((axios) => {
  axios.defaults.baseURL = getConfig('API_URL', true)
})
