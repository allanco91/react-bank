import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:44369/api/transactions',
})

export default api