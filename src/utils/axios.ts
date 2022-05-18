import axios from 'axios';

export default axios.create({
  baseURL: 'http://192.168.100.3:4000/',
  headers: {'content-type': 'application/json'},
  withCredentials: true,
});
