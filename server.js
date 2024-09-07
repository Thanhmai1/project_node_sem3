const app = require('./app');
const mongoose = require('mongoose');
const express = require("express")
// const app = express()
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/')
    .then(()=>{
        console.log("Connection successful")
    })
    .catch(()=>{
        console.log("Error Connection to database")
    })

// app = require('app');
app.listen(8000,()=>{
    console.log(`Server listening ${8000}`)
})