require('../src/db/mongoose')
const User = require('../src/models/user')

//5cf94223f0e42f081cbfe7e7

// User.findByIdAndUpdate('5cff7e10f4d0090fc038eda3',{ age: 1 }).then((user)=>{
//     console.log(user)
//     return User.countDocuments({ age: 1 })
// }).then((result)=>{
//     console.log(result)
// }).catch((e)=>{
//     console.log(e)
// })

const updateAgeAndCount = async (id,age)=>{
    const user = await User.findByIdAndUpdate('5cff7e10f4d0090fc038eda3',{ age })
    const count = await User.countDocuments({age})
    return count
}

updateAgeAndCount('5cff7e10f4d0090fc038eda3',2).then((result)=>{
    console.log(result)
}).catch((e)=>{
    console.log(e)
})