import { createRouter, createWebHistory } from "vue-router"
import ThemePage from '@/components/ThemePage'
import MyContacts from '@/components/MyContacts'
import FeedIn from '@/views/FeedIn'
import SignIn from '@/views/SignIn'
import RegisterIn from '@/views/RegisterIn'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import App from '@/App'

const routes = [
    
    {
        path: '/',
        component: ThemePage,
        meta: {
            requiresAuth: true,
        }
    },

    {
        path: '/about-us',
        component: App
    },


    {
        path: '/contacts',
        component: MyContacts
    },

    {
        path: '/register',
        component: RegisterIn
    },

    {
        path: '/sign-in',
        component: SignIn
    },

    {
        path: '/feed',
        component: FeedIn,
        meta: {
            requiresAuth: true,
        }
    },

]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const removeListener = onAuthStateChanged(
            getAuth(),
            (user) => {
                removeListener();
                resolve(user);
            },
            reject
        )
    })
}

router.beforeEach(async(to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (await getCurrentUser()) {
            next();
        } else {
            alert('У вас нет доступа, войдите или создайте аккаунт');
            next("/sign-in");
        }
    } else {
        next();
    }
});

export default router;