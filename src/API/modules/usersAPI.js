import {axiosInstance} from "../index.js";

export const usersAPI = {
    getUsers(params = {}){
        return axiosInstance.get("/v1/users", {params: params});
    },
    createUser(payload) {
        return axiosInstance.post('/v1/users', payload);
    }
}