const DefaultLayout = () => import("../layouts/default.vue");
const AuthLayout = () => import("../layouts/auth.vue");

const Login = () => import("../pages/auth/login.vue");

const Dashboard = () => import("../pages/index.vue");

const UsersIndex = () => import("../pages/users/index.vue");
const UsersModify = () => import("../pages/users/modify.vue");

const FaqsIndex = () => import("../pages/faqs/index.vue");
const FaqsModify = () => import("../pages/faqs/modify.vue");

const ReviewsIndex = () => import("../pages/reviews/index.vue");
const ReviewsModify = () => import("../pages/reviews/modify.vue");


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
                        component: UsersModify
                    },
                    {
                        path: ':id/edit',
                        name: 'users.edit',
                        component: UsersModify
                    }
                ]
            },
            {
                path: 'faqs',
                children: [
                    {
                        path: '',
                        name: 'faqs.index',
                        component: FaqsIndex
                    },
                    {
                        path: 'create',
                        name: 'faqs.create',
                        component: FaqsModify
                    },
                    {
                        path: ':id/edit',
                        name: 'faqs.edit',
                        component: FaqsModify
                    }
                ]
            },
            {
                path: 'reviews',
                children: [
                    {
                        path: '',
                        name: 'reviews.index',
                        component: ReviewsIndex
                    },
                    {
                        path: 'create',
                        name: 'reviews.create',
                        component: ReviewsModify
                    },
                    {
                        path: ':id/edit',
                        name: 'reviews.edit',
                        component: ReviewsModify
                    }
                ]
            },
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

export default routes;