const express = require('express')
const router = new express.Router()
const sharp = require('sharp')
const User = require('../models/user')
const {sendWelcomeEmail,sendCancelEmail} = require('../emails/account')
const bcrypt = require('bcryptjs')
const auth = require('../middleware/auth')
const multer = require('multer')

router.post('/users',async (req, res)=>{
    const user = new User(req.body)
    try{
        await user.save()
        sendWelcomeEmail(user.email,user.name)
        const token = await user.generateAuthToken()
        res.status(201).send({user,token})
    }catch(e){
        res.status(400).send(e)
    }
})

router.post('/users/login',async (req, res)=>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        res.send({user,token})
    }catch(e){
        res.status(400).send()
    }
})

router.post('/users/logout',auth,async (req,res)=>{
    try{
        
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        
        await req.user.save()
        res.send()
    }catch(e){
        req.status(500).send()
    }   
})

router.get('/users/me',auth,async (req,res)=>{
    res.send(req.user)  
})

router.patch('/users/me',auth,async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','email','password','age']
    const inValidOperation = updates.every((update)=> allowedUpdates.includes(update))
    if(!inValidOperation){
        return res.status(400).send({Error : 'invalid updates' })
    }
    //const _id = req.params.id
    try{

        

        updates.forEach((update)=>req.user[update] = req.body[update] )

        await req.user.save()

        //const user = await User.findByIdAndUpdate(_id,req.body,{ new:true , runValidators:true })
        res.send(req.user)
    }catch(e){
        res.status(400).send(e)
    }
})

router.delete('/users/me',auth,async (req,res)=>{

    try{
        // const user = await User.findByIdAndDelete(req.user._id)
         
         //if(!user){
           // return res.status(404).send()
         //}
        await req.user.remove()
        sendCancelEmail(req.user.email,req.user.name)
        res.send(req.user)
    }
    catch(e){
        res.status(500).send(e)
    }
}) 

const avatar = multer({
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            
            cb(new Error("Please upload an Image"))
        }
        cb(undefined,true)
    }
})
router.post('/user/me/avatar',auth,avatar.single('avatar'),async (req,res)=>{
    const buffer = await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()
   
    req.user.avatar = buffer
    await req.user.save()
    res.send()
},(error,req,res,next)=>{
    res.status(400).send({error :error.message})
})

router.delete('/user/me/avatar',auth,async (req,res)=>{
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

router.get('/users/:id/avatar',async (req,res)=>{
    try{
        const user  = await User.findById(req.params.id)

        if(!user || !user.avatar){
            throw new Error()
        }

        res.set('Content-Type','image/jpg')
        res.send(user.avatar)
    }
    catch(e){
        res.status(400).send()
    }
})
module.exports = router