<template>
    <div id="app">
    <nav class="main-nav">
       <ul>
           <li id="brand"><b><router-link to="/" id="brand">Task Manager</router-link></b></li>
           <li v-if="!this.$store.state.loggedIn"><router-link to="/login">Login</router-link></li>
           <li v-if="this.$store.state.loggedIn" @click.prevent="logout"><router-link to="/">Logout</router-link></li>
       </ul>
    </nav>
    <p>{{abc}}</p>
</div>
</template>

<script>
import AuthenticationService from '../../services/AuthenticationService'
export default {
    name:'Navbar',
    data(){
      return{
        abc:''
      }
    },
   methods:{
     async logout(){
       
       const token = this.$store.state.authToken
       const response = await AuthenticationService.logout(token)
       this.$store.commit('logout')
       this.$router.push('/login')
       response 
     }
   }
    
}
</script>

<style>
#brand{
    float:left;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
}

li a{
  float: right;
}

li a{
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

/* Change the link color to #111 (black) on hover */
li a:hover {
  background-color: #5F4766;
  color: white;
  text-decoration: none;
}
#brand{
    background-color:  #333;
}
</style>