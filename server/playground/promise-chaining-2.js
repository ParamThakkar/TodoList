require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('5cff8502d3938a07287f695f').then((task)=>{
//     console.log(task)
//     return Task.countDocuments({ completed:false })
// }).then((count)=>{
//     console.log(count)
// }).catch((e)=>{
//     console.log(e)
// })

const taskDeleteAndCount = async (id,completed)=>{
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed })
    return count
}

taskDeleteAndCount('5cff84abe9caca0b389fed87',true).then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})