import axios from 'axios';
const baseApiUrl=process.env.BASE_API_URL
export const myAxios = axios.create({baseURL : baseApiUrl || "http://localhost:5000"})
