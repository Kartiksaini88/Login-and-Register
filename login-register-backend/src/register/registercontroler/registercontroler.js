const express = require('express')
const router = express.Router()
const User = require('../../user/usermodel')




router.post('' , async(req,res)=>{
    const {name , email , password} = req.body
    User.findOne({email:email},async(err,user)=>{
        if(user){
            res.send({message:"User Already Registerd"})
        }else{
            const user = new User({
                name,
                email,
                password,
            })
           
            user.save(err=>{
                if(err){
                    res.send(err)
                }else{
                    res.send({message:"Sucessfully Registered"})
                }
            })
            
        }
    })

}) 

module.exports = router