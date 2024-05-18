import {faqsService} from "../../API/services/faqsService.js";
import router from "../../router/index.js";

const state = {
    faqs: [],
    total: 0,
    currentFaq: null,
    params: {
        page: 1,
        limit: 10
    }
}

const getters = {
    faqs: state => state.faqs,
    total: state => state.total,
    currentFaq: state => state.currentFaq,
    params: state => state.params
}

const mutations = {
    SET_FAQS(state, faqs) {
        state.faqs = faqs;
    },
    SET_TOTAL(state, total) {
        state.total = total;
    },
    SET_CURRENT_FAQ(state, faq) {
        state.currentFaq = faq;
    },
    SET_PARAMS(state, params) {
        state.params = params;
    }
}

const actions = {
    async fetchFaqs({commit, state}, params) {
        if (params) commit('SET_PARAMS', params);
        const {data} = await faqsService.getFaqs(state.params);
        commit('SET_FAQS', data.data);
        commit('SET_TOTAL', data.meta.total);
    },

    async createFaq({commit}, payload) {
        await faqsService.createFaq(payload);
        await router.push({name: 'faqs.index'});
    },

    async fetchFaq({commit}, id) {
        const {data} = await faqsService.findFaqById(id);
        commit('SET_CURRENT_FAQ', data.data);
    },
    
    async updateFaq({commit}, {payload, id}) {
        await faqsService.updateFaq(payload, id);
        await router.push({name: 'faqs.index'});
    },
    async deleteFaq({dispatch}, id) {
        await faqsService.deleteFaq(id);
        dispatch('fetchFaqs');
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}