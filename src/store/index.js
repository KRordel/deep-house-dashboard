import { createStore } from "vuex";
import usersStore from "./modules/usersStore.js";

export default createStore({
    modules: {
        usersStore,
    },
});