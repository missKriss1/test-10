import axios from 'axios';
import { apiUrl } from './globalConstant.ts';

const axiosApi = axios.create({
  baseURL: apiUrl,
});

export default axiosApi;