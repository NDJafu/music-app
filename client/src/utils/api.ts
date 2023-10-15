import axios from "axios"
import { store } from "../app/store"

export const api = axios.create({
  baseURL: "/api/v1",
  withCredentials: true,
})

api.interceptors.request.use(function (config) {
  const token = store.getState().auth.token
  config.headers.Authorization = `Bearer ${token}`

  return config
})
