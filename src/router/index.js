import { createRouter, createWebHistory } from "vue-router";

import DefaultLayout from "../layouts/default.vue";
import AuthLayout from "../layouts/auth.vue";
import Dashboard from "../pages/index.vue";
import Login from "../pages/auth/login.vue";
import UsersIndex from "../pages/users/index.vue";
import UsersCreate from "../pages/users/create.vue";
import UsersEdit from "../pages/users/edit.vue";

const routes = [
    {
        path: '',
        component: DefaultLayout,
        children: [
            {
                path: 'dashboard',
                name: 'dashboard',
                component: Dashboard
            },
            {
                path: 'users',
                children: [
                    {
                        path: '',
                        name: 'users.index',
                        component: UsersIndex
                    },
                    {
                        path: 'create',
                        name: 'users.create',
                        component: UsersCreate
                    },
                    {
                        path: ':id/edit',
                        name: 'users.edit',
                        component: UsersEdit
                    }
                ]
            }
        ]
    },
    {
        path: '/login',
        component: AuthLayout,
        children: [
            {
                path: '',
                name: 'login',
                component: Login
            },  
        ]
    },
      
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;