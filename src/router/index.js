import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';
import { routesAuth } from '@/views/pages/auth/Router';
const routes = [
    {
        path: '/',
        name: 'home',
        // beforeEnter: verifyLoggedUser,
        component: AppLayout,
        history: createWebHistory(),
        children: [
            {
                path: '/',
                name: 'dashboard',
                component: () => import('@/views/Dashboard.vue')
            },
            {
                path: '/pages/empty',
                name: 'empty',
                component: () => import('@/views/pages/Empty.vue')
            }
        ]
    },
    ...routesAuth,
    {
        path: '/:pathMatch(.*)*',
        name: 'notfound',
        component: () => import('@/views/pages/NotFound.vue')
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('@/views/pages/auth/About.vue')
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

const DEFAULT_TITLE = 'Plantilla';
router.afterEach((to) => {
    document.title = to.meta.title || DEFAULT_TITLE;
});

function verifyLoggedUser(to, from, next) {
    if (localStorage.getItem(import.meta.env.VITE_APP_USER)) next();
    else next({ name: 'login' });
}

export default router;
