// Dynamic Loading Modules

import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import jwt from "vue-jwt-decode"
Vue.use(jwt);
var key = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
Vue.prototype.key = key;

// Views
const Home = resolve => { require.ensure(['../components/Home.vue'], () => { resolve(require('../components/Home.vue')); }); };
const Register = resolve => { require.ensure(['../components/Register.vue'], () => { resolve(require('../components/Register.vue')); }); };
const Login = resolve => { require.ensure(['../components/Login.vue'], () => { resolve(require('../components/Login.vue')); }); };


import Dash from "../components/admin/Dashboard.vue";
import Role from "../components/admin/Role.vue"
import AddRole from "../components/admin/AddRole.vue"
import Course from "../components/admin/Course.vue"
import AddCourse from "../components/admin/AddCourse.vue"
import AddInstitution from "../components/admin/AddInstitution.vue"
import Institution from "../components/admin/Institution.vue"
import Users from "../components/admin/Users.vue"
import AddUser from "../components/admin/AddUser.vue"
import UserLogin from "../components/UserLogin"
import UserRegister from "../components/UserRegister"
import Search from "../components/Search"
import Dashboard from "../components/Dashboard"
import DashboardNav from "../components/DashboardNav"
import UserProfile from "../components/UserProfile"
import CalculateGpa from "../components/CalculateGpa"
import Contact from "../components/Contact"
import About from "../components/About"

Vue.component('DashboardNav', DashboardNav)













export const routes = [
    {
        path: '/',
        name: 'home',
        components: {
            default: Home
        }
    },
    { path: '/register', name: 'register', component: UserRegister },
    { path: '/aboutus', name: 'about', component: About },
    { path: '/contactus', name: 'contact', component: Contact },
    { path: '/search/:c?/:s?', name: 'search', component: Search },
    {
        path: '/admin', name: 'admin', component: Dash, meta: {
            admin: true
        }
    },
    {
        path: '/admin/addcourse', name: 'addcourse', component: AddCourse, meta: {
            admin: true
        }
    },
    {
        path: '/admin/course', name: 'course', component: Course, meta: {
            admin: true
        }
    },
    {
        path: '/admin/institution', name: 'institution', component: Institution, meta: {
            admin: true
        }
    },
    {
        path: '/admin/addinstitution', name: 'addinstitution', component: AddInstitution, meta: {
            admin: true
        }
    },
    {
        path: '/admin/users', name: 'users', component: Users, meta: {
            admin: true
        }
    }, {
        path: '/admin/adduser', name: 'adduser', component: AddUser, meta: {
            admin: true
        }
    },
    {
        path: '/admin/role', name: 'role', component: Role, meta: {
            admin: true
        }
    },
    {
        path: '/admin/addrole', name: 'addrole', component: AddRole, meta: {
            admin: true
        }
    }, {
        path: '/dashboard', name: 'dashboard', component: Dashboard, meta: {
            Auth: true
        }
    }, {
        path: '/profile', name: 'userprofile', component: UserProfile, meta: {
            Auth: true
        }
    },
    {
        path: '/calculategpa', name: 'gpa', component: CalculateGpa, meta: {
            Auth: true
        }
    },
    { path: '/login', name: 'login', component: UserLogin }

];


Vue.use(VueRouter);
const router = new VueRouter({
    routes,
    scrollBehavior: () => ({ y: 0 }),
    mode: 'history'
});

function getToken()
{
    if (!!window.localStorage.getItem("akadatoken"))
    {
        var token = JSON.parse(window.localStorage.getItem("akadatoken"));
        var expiration = new Date(token.exp).getTime();
        var now = new Date().getTime();

        if (expiration > now)
        {
            return token.token;
        } else
        {
            window.localStorage.removeItem("acadatoken");
            window.localStorage.removeItem("userInfo");
            return false;
        }
    } else
    {
        return false;
    }
}


router.beforeEach((to, from, next) =>
{
    var token = getToken();
    if (to.name == "login")
    {
        if (!!token)
        {
            next({ name: 'home' });
        } else
        {
            next();
        }
    } else if (to.matched.some(route => route.meta.Auth))
    {


        if (token === false)
        {
            next("/login");
        } else
        {
            next();
        }

    } else if (to.matched.some(route => route.meta.admin))
    {


        if (!!token)
        {
            var decode = jwt.decode(token);
            var code = (Array.isArray(decode[key])) ? decode[key].toString() : decode[key];

            if (code.search("Admin") == -1)
            {
                next("/login");
            } else
            {
                next();
            }
        } else
        {
            next("/login");
        }
    } else
    {

        next();
    }

});

export default router;