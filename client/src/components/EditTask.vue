<template>
    <div class="editTask">
        <form @submit.prevent="editTask">
            <label>Description:-</label><br>
            <input id="input1" type="text" v-model="desc"><br>
            <label>Status:-</label><br><br>
            <input type="radio" value="true" v-model="status">True<br><br>
            <input type="radio" value="false" v-model="status">False<br><br>
            <button type="submit">Edit</button>
        </form>
    </div>
</template>

<script>
import AuthenticationService from '../../services/AuthenticationService'
export default {
    data(){
        return{
            id: this.$route.params.id,
            desc:'',
            status:'',
        }
    },
    methods:{
        async editTask(){
            let token = this.$store.state.authToken
            if(this.status === false){
            let response = await AuthenticationService.editTask(this.id,token,{
                description : this.desc,
                completed : false
            })
            response
            }
            else{
                let response = await AuthenticationService.deleteTask(this.id,token)
                response
            }   
            this.$router.push('/app',this.$store.state.loggedIn=true)
        }
    },
    async created(){
        let token = this.$store.state.authToken
        const response = await AuthenticationService.viewTask(this.id,token)
        this.desc = response.data.description
        this.status = response.data.completed
    },
    beforeCreate(){
        if(!this.$store.state.loggedIn){
            alert('Please Authenticate')
            this.$router.push({name:'Login'})
        }
    }
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