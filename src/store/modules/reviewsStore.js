import {reviewsService} from "../../API/services/reviewsService.js";
import router from "../../router/index.js";

const state = {
    reviews: [],
    total: 0,
    currentReview: null,
    params: {
        page: 1,
        limit: 10
    }
}

const getters = {
    reviews: state => state.reviews,
    total: state => state.total,
    currentReview: state => state.currentReview,
    params: state => state.params
}

const mutations = {
    SET_REVIEWS(state, reviews) {
        state.reviews = reviews;
    },
    SET_TOTAL(state, total) {
        state.total = total;
    },
    SET_CURRENT_REVIEW(state, review) {
        state.currentReview = review;
    },
    SET_PARAMS(state, params) {
        state.params = params;
    }
}

const actions = {
    async fetchReviews({commit, state}, params) {
        if (params) commit('SET_PARAMS', params);
        const {data} = await reviewsService.getReviews(state.params);
        commit('SET_REVIEWS', data.data);
        commit('SET_TOTAL', data.meta.total);
    },

    async createReview({commit}, payload) {
        await reviewsService.createReview(payload);
        await router.push({name: 'reviews.index'});
    },

    async fetchReview({commit}, id) {
        const {data} = await reviewsService.findReviewById(id);
        commit('SET_CURRENT_REVIEW', data.data);
    },
    
    async updateReview({commit}, {payload, id}) {
        await reviewsService.updateReview(payload, id);
        await router.push({name: 'reviews.index'});
    },
    async deleteReview({dispatch}, id) {
        await reviewsService.deleteReview(id);
        dispatch('fetchReviews');
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}