const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const port = 8080;
const connect = require('./config/db')
const app = express()
const register = require('./register/registercontroler/registercontroler')
const login = require('./login/logincontroler/logincontroler')
const user = require('./user/usercontroler')
mongoose.set('strictQuery', true);

app.use(express.json())
app.use(cors())

app.use('/register',register)
app.use('/login',login)
app.use('/user',user)

app.listen(port , async()=>{
    try {
        await connect()
        console.log(`This is port ${port} yo`)
    } catch (error) {
        console.log(error)
    }
})
