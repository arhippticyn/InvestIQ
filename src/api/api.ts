import axios from "axios";
export const BACKEND_URL: string = import.meta.env.VITE_BACKEND_URL

export const api = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
});
