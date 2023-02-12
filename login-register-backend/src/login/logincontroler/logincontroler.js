const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../../user/usermodel')
const secreteKey = 'secreteKey'

router.post('',async(req,res)=>{
    const {email , password} =req.body
    User.findOne({email:email},(err,user)=>{
        if(user){
            if(password==user.password){
                jwt.sign({user},secreteKey,{expiresIn:'500s'},(err,token)=>{
                    res.send({token})
                })
            }
            else{
                res.send({message:"Password doesn't match"})
               }
        }
        else{
            res.send({message:"User not found"})
        }
    })
})


module.exports = router