const axios = require("axios");

export const axiosInstance = axios.create({
 baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

const apiInterceptor = (config) => {
 const token = localStorage.getItem('token_url_shortener');
 if (token) {
  config.headers.Authorization = `Bearer ${token}`;
 }
 return config;
};

axiosInstance.interceptors.request.use(apiInterceptor);

export default axiosInstance;

