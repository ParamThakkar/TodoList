<template>
    <div id="app">
        <div id="router"> 
            <table align="center"> 
            <tr><th>Task</th><th>status</th><th id="buttonsh"><button @click.prevent="addTask" id="buttons">AddTask</button></th></tr>
            <tr v-for="(Task,index) in tasks" :key="index">
                <td>{{Task.description}}</td>
                <td>{{Task.completed}}</td>
                <td id="buttonsh"><router-link :to="'/editTask/'+Task._id"><button id="buttons">Edit</button></router-link></td>
            </tr>
        </table>      
        </div>
    </div>
</template>

<script>
import AuthenticationService from '../../services/AuthenticationService'
export default {
     data(){
        return{
            tasks: []
        }
        
    },
    
    created(){
        let token = this.$store.state.authToken
        AuthenticationService.readTasks(token).then(response=>{
        this.tasks =  response.data
        })
        
    },
    components:{
        
    },
    beforeCreate(){
        if(!this.$store.state.authToken){
            alert('Please Authenticate')
            this.$router.push({name:'SignUp'})
        }
    },
    methods:{
        addTask(){
            this.$router.push('/addTask')
        },
    }
}
            
    


</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 80%;
  margin-left: 120px;
  margin-right: 100px;
}
table,th,td{
  border: 1px solid #333;
  text-align: left;
}
th, td {
  text-align: left;
  padding: 8px;
}
#buttonsh{
    text-align:center;
    width:30%;
}
#buttons{
    width:100px;
}
tr:nth-child(even) {background-color: #D2CECD;color:black}
button{
    color: white;
    background-color: #333;
    border: #333;
    border-radius: 10px;
}
button:hover{
    background-color: #5F4766;
}
</style>