const express = require('express');
const app = express();  
const {webbites , checkChainValidity , getLatestBlock , getAllBlocks , addBlock} = require('./index.js')

app.use(express.json());



app.post('/createBlock' , function Block(req , res){
    const data = req.body.data;
    // testing data jaa rha 
    // console.log(data)
    // console.log(typeof(data))
    addBlock(data);
    res.send("Block created");
})

app.get('/getLatestBlock' , (req , res)=>{
    console.log(getLatestBlock)
    res.json(getLatestBlock)
})

app.get('/verifyChain' , (req , res)=>{
    if(checkChainValidity){
        res.json({valid : true})
    }else{
        res.json({valid : false})
    }
})

app.get("/printChain" , (req , res)=>{
    res.json(webbites)
    console.log(webbites)
})

app.listen(3000 , function listen(req , res){
    console.log('server is running on port 3000');
})