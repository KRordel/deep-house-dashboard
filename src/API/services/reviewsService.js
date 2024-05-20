import {axiosInstance} from "../index.js";

const uri = '/v1/reviews';

export const reviewsService = {
    getReviews(params) {
        return axiosInstance.get(uri, {params: params});
    },
    createReview(payload) {
        return axiosInstance.post(uri, payload);
    },
    findReviewById(id) {
        return axiosInstance.get(`${uri}/${id}`);
    },
    updateReview(payload, id) {
        return axiosInstance.patch(`${uri}/${id}`, payload);
    },
    deleteReview(id) {
        return axiosInstance.delete(`${uri}/${id}`);
    }
}