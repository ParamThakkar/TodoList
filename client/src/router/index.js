import Vue from 'vue'
import VueRouter from 'vue-router'
import SignUp from '../components/SignUp.vue'
import VueResource from 'vue-resource'
import Login from '../components/Login'
import App from '../components/App'
import AddTask from '../components/AddTask'
import EditTask from '../components/EditTask'

Vue.use(VueRouter)
Vue.use(VueResource)

const routes = [
  {
    path: '/',
    name: 'SignUp',
    component: SignUp
  },
  {
    path:'/login',
    name:'Login',
    component: Login,
  },
  {
    //mode:'history',
    path:'/app',
    name:'App',
    component: App,
  },
  {
    path:'/addTask',
    name:'AddTask',
    component:AddTask
  },
  {
    path:'/editTask/:id',
    name:'EditTask',
    component:EditTask
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
