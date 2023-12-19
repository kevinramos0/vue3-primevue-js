import axios from 'axios';
import store from '@/store';
import router from '@/router';
import TokenService from '@/services/users/token';

export default function axiosSetUp() {
    // point to your API endpoint
    axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL || 'http://localhost:8001';
    // Add a request interceptor
    axios.interceptors.request.use(
        async (config) => {
            // Do something before request is sent
            config.headers['Content-Type'] = 'application/json';
            const token = await TokenService.getLocalAccessToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            // Do something with request error
            Promise.reject(error);
        }
    );

    // Add a response interceptor
    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            // Do something with response error
            const originalRequest = error.config;
            if (error.response.status === 401 && originalRequest.url.includes('/api/auth/refresh/')) {
                await store.dispatch('auth/logout');
                router.go({ name: 'auth' });
                return Promise.reject(error);
            } else if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                try {
                    const refreshToken = await TokenService.getLocalRefreshToken();
                    const rs = await axios.post(`/api/auth/refresh/${refreshToken}`);

                    const { token } = rs.data;
                    await store.dispatch('auth/refreshToken', token);
                    TokenService.updateLocalAccessToken(token);
                    return axios(originalRequest);
                } catch (err) {
                    store.commit('alert', {
                        color: 'danger',
                        text: `The session has expired, please login again`,
                        multiline: true
                    });
                    TokenService.removeUser();
                    setTimeout(() => {
                        router.go({ name: 'auth' });
                    }, 2000);

                    return Promise.reject(err);
                }
            }
            return Promise.reject(error);
        }
    );
}
