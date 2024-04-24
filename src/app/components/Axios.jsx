import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_BASE_URL_LOCAL
    : process.env.NEXT_PUBLIC_BASE_URL_PROD;

const api = axios.create({
    baseURL,
});

export default api;
