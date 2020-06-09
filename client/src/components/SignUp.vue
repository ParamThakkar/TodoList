<template>
    <div id = "" class="su-div">
        <br>
        <form @submit.prevent="signmeup">
            <label>Enter Your Name:</label><br>
            <input type="text" name="name" placeholder="e.g-Param Thakkar" v-model="name"><br><br>
            <label>Enter Your Email:</label><br>
            <input type="email" name="email" placeholder="abc@gmail.com" v-model="email"><br><br>
            <label><span>Password:</span></label><br>
            <input type="password" name="password" v-model="password"><br><br>
            <p><router-link to="/login">Already a user?</router-link></p>
            <button type="submit">Sign Up</button>
        </form>
        <p>{{feedback}}</p>
    </div>
</template>

<script>
import AutheticationService from '../../services/AuthenticationService'
export default {
    name:"SignUp",
    data(){return{
    name : '',
    email : '',
    password: '',
   
    }},
    methods:{
        async signmeup(){
            const response = await AutheticationService.signUp({
                name: this.name,
                email: this.email,
                password: this.password
            })
            if(response.status === 201){
                this.$store.commit('login',response.data.token)
                this.$router.push({path:'/app'})
            }
            
        }
    }
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