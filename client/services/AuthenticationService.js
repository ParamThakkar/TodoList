import Api from './Api'
export default {
    signUp(credentials){
        return Api().post('users',credentials)
    },
    login(credentials){
        return Api().post('users/login',credentials)
    },
    readTasks(credentials){
        return Api().get('tasks?sortBy=createdAt:desc',{headers:{ "Authorization": `Bearer ${credentials}` }})
    },
    addTask(token,credentials){
        return Api().post('tasks',credentials,{headers:{ "Authorization": `Bearer ${token}` }})
    },
    logout(credentials){
        return Api().post('users/logout',{},{headers:{ "Authorization": `Bearer ${credentials}` }})
    },
    editTask(id,token,credentials){
        return Api().patch('task/'+id,credentials,{headers:{ "Authorization": `Bearer ${token}` }})
    },
    viewTask(id,token){
        return Api().get("task/"+id,{headers:{ "Authorization": `Bearer ${token}` }})
    },
    deleteTask(id,token){
        return Api().delete("task/"+id,{headers:{ "Authorization": `Bearer ${token}` }})
    }
}