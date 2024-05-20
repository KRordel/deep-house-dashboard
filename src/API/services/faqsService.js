import {axiosInstance} from "../index.js";
import {showNotification} from "../index.js";

const uri = '/v1/faqs';

export const faqsService = {
    getFaqs(params) {
        return axiosInstance.get(uri, {params: params});
    },
    createFaq(payload) {
        return axiosInstance.post(uri, payload);
    },
    findFaqById(id) {
        return axiosInstance.get(`${uri}/${id}`);
    },
    updateFaq(payload, id) {
        return axiosInstance.patch(`${uri}/${id}`, payload);
    },
    deleteFaq(id) {
        showNotification('warning', 'Запись удалена!');
        return axiosInstance.delete(`${uri}/${id}`);
    }
}