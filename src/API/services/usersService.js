import {axiosInstance} from "../index.js";

const uri = '/v1/users';

export const usersService = {
    getUsers(params) {
        return axiosInstance.get(uri, {params: params});
    },
    createUser(payload) {
        return axiosInstance.post(uri, payload);
    },
    findUserById(id) {
        return axiosInstance.get(`${uri}/${id}`);
    },
    updateUser(payload, id) {
        return axiosInstance.patch(`${uri}/${id}`, payload);
    },
}