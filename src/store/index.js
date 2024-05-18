import { createStore } from "vuex";
import usersStore from "./modules/usersStore.js";
import faqsStore from "./modules/faqsStore.js";

export default createStore({
    modules: {
        usersStore,
        faqsStore,
    },
});