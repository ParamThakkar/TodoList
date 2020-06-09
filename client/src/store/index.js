import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authToken:'',
    loggedIn:false,
  },
  getters:{
    
  },
  mutations: {
    login:(state,token)=>{
      state.loggedIn = true
      state.authToken = token
    },
    logout:state=>{
      state.loggedIn = false
      state.authToken = ''
    }
  },
  actions: {
  },
  modules: {
  }
})
