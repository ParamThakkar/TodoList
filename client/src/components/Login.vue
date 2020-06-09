<template>
    <div id = "" class="login-div">
        <br>
        <form @submit.prevent="login">
            <label>Enter Your Email:</label><br>
            <input type="email" name="email" placeholder="abc@gmail.com" v-model="email"><br><br>
            <label><span>Password:</span></label><br>
            <input type="password" name="password" v-model="password"><br><br>
            <p id="link"><router-link to="/">Not a User?,Register</router-link></p>
            <button type="submit">Login</button>     
            
        </form>
        <p>{{feedback}}</p>
    </div>
</template>

<script>
import AuthenticationService from '../../services/AuthenticationService'

export default {
    name:'Login',
    data(){
        return{
            email:'',
            password:'',
        }
    },
    methods:{
        async login(){
            const response = await AuthenticationService.login({
                email: this.email,
                password: this.password
            })
            //this.feedback = response.data.token
            if(response.status === 200){
                this.$router.push({path:'/app'})
                this.$store.commit('login',response.data.token)
            }
        }
    },
    computed:{
        loggedIn(){
            return this.$store.state.loggedIn
        }
    },
}
</script>

<style scoped>
div{
    text-align: center;
    font-family:Georgia, 'Times New Roman', Times, serif;
}
label{
    padding-left: 0px;
}
input {
  width:30%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border: none;
  border-bottom: 2px solid #5F4766;
}
input:focus{
    outline: none;
}
label{
    font-size: 25px;
}
a{
    color: #5F4766;
}
a:hover{
    color: #333;
}
button{
    padding: 10px 25px;
    color: white;
    background-color: #333;
    border: #333;
    border-radius: 10px;
}
button:hover{
    background-color: #5F4766;
}
</style>