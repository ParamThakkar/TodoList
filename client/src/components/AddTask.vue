<template>
    <div id="addTask">
        <form @submit.prevent="addTask">
            <label>Description:</label><br>
            <input id="input1" type="text" v-model="desc"><br><br>
            <label>Status:</label><br>
            <input type="radio" value="true" v-model="status">True<br><br>
            <input type="radio" value="false" v-model="status">False<br><br>        
            <button type="submit">Add</button>
        </form>
    </div>
</template>

<script>
import AuthenticationService from '../../services/AuthenticationService'
export default {
    data(){
        return{
            desc:'',
            status:''
        }
    },
    methods:{
        async addTask(){
            let status2 = true
            if(this.status === "false"){
                status2 = false
                let token = this.$store.state.authToken
                const response = await AuthenticationService.addTask(token,{
                description: this.desc,
                completed: status2
                })
                response
            }
            this.$router.push('/app')
        }
    }, 
    beforeCreate(){
        if(!this.$store.state.loggedIn){
            alert('Please Authenticate')
            this.$router.push({name:'SignUp'})
        }
    },
}
</script>

<style scoped>
div{
    text-align: center;
    font-family:Georgia, 'Times New Roman', Times, serif;
}
#input1 {
  width:30%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border: none;
  border-bottom: 2px solid #5F4766;
}
#input1:focus{
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