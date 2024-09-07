const app = require('./app');
const mongoose = require('mongoose');
const express = require("express")
// const app = express()
app.use(express.json());

app.listen(8000,()=>{
    console.log(`Server listening ${8000}`)
})