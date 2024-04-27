import axios from 'axios'
import queryString from 'query-string'

const axiosClient = axios.create({
  baseURL: 'http://localhost:9000/v1',
  headers: {
    'content-type': 'application/json'
  },
  paramsSerializer: (params) => queryString.stringify(params)
})

export default axiosClient
