import axios from 'axios'
import { VITE_BACKEND_BASE_URL } from '../config'

export const instance = axios.create({
  baseURL: VITE_BACKEND_BASE_URL
})
