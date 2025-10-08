import axios from 'axios';
import { useSnackbar } from '@/composables/useSnackbar';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
  },
  timeout: 10000,
});

const { showError } = useSnackbar();

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 500:
          showError('Server error. Please try again later.');
          console.error(error.response.data);
          break;
        default:
          showError(error.response.data?.message || 'Unknown error');
          console.error(error.response.data);
      }
    } else {
      showError('Network error. Check your connection.');
      console.error(error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
