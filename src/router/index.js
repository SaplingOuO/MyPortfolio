import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../App.vue')
    },
    {
        path: '/Layout',
        children:[
            // {
            //     path: '/Layout/AnimatedText',
            //     name: 'AnimatedText',
            //     component: () => import('../views/Layout/animatedText.vue')
            // },
        ],
    },
    {
        path: '/Components',
        children:[
            {
                path: '/Components/AnimatedText',
                name: 'AnimatedText',
                component: () => import('../views/Components/animatedText.vue')
            },
            {
                path: '/Components/BackgroundColorChange',
                name: 'BackgroundColorChange',
                component: () => import('../views/Components/BackgroundColorChange.vue')
            },
            {
                path: '/Components/HomeViewSlide',
                name: 'HomeViewSlide',
                component: () => import('../views/Components/HomeViewSlide.vue')
            },
            {
                path: '/Components/ThreeJS/ThreeCube',
                name: 'ThreeCube',
                component: () => import('../views/Components/ThreeJS/ThreeCube.vue')
            },
            {
                path: '/Components/ThreeJS/ThreeExample',
                name: 'ThreeExample',
                component: () => import('../views/Components/ThreeJS/ThreeExample.vue')
            },
            {
                path: '/Components/ThreeJS/ThreeInteractive',
                name: 'ThreeInteractive',
                component: () => import('../views/Components/ThreeJS/ThreeInteractive.vue')
            },
        ],
    },
    {
        path: '/Project',
        children:[
            // {
            //     path: '/Project/AnimatedText',
            //     name: 'AnimatedText',
            //     component: () => import('../views/Project/animatedText.vue')
            // },
        ],
    },

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    base: process.env.BASE_URL,
    routes
});

export default router;