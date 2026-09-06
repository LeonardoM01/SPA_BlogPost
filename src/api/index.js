import axios from "axios";

export const http = await axios.create({
    baseURL: "http://localhost:3000"
});

http.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers = {
                Authorization: `Bearer ${token}`
            }
        }

        return config;
    }, function (error) {
        return Promise.reject(error);
    }

);