import axios from 'axios'
export const BACKEND_URL: string = import.meta.env.VITE_BACKEND_URL

export const api = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
})

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config

    if (originalRequest.url?.includes('/auth/refresh')) {
      window.location.href = '/'
      return Promise.reject(error)
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        await api.get('/auth/refresh')
        return api(originalRequest)
      } catch (e) {
        window.location.href = '/'
      }
    }

    return Promise.reject(error)
  }
)
