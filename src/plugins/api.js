import Vue from 'vue';
// import store from '../store'
import http_client from 'axios';

const api = {
    get: async (path, params, headers) => {
        return await http_client.get(path, { params }, { headers });
    },
    post: async (path, parms, headers) => {
        return await http_client.post(path, parms, { headers });
    },
    put: async (path, parms, headers) => {
        return await http_client.put(path, parms, { headers });
    },
    delete: async (path, headers) => {
        return await http_client.delete(path, { headers });
    }
};

Vue.prototype.api = api;

export default api;
