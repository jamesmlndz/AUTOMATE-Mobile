// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // replace with your server IP if testing on real device
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
