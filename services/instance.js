// import axios from '../node_modules/axios/dist/axios.min.js';

const instance = axios.create({
    baseURL: 'http://greenvelvet.alwaysdata.net/bugTracker/api/',
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
  
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

  export default instance