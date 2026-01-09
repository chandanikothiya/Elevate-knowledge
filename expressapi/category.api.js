// import express from 'express'
// import path from 'path';

const express = require("express")
const path = require("path")


// const express = require('express');
const app = express();
const port = 8080;

let category = [
    {id:1,name:'develoment'},
    {id:2,name:'designing'}
]

app.use(express.json())

//get api
app.get('/category', (req, res) => {
    res.json(category);
});

//post
app.post('/category',(req,res) => {
    // res.send('POST Requset To category')
    const body = req.body.name;
    console.log(body)

    const newcat = {
        id:category.length + 1,
        name:body
    }

    category.push(newcat)
    res.write('ok')
})

//put
app.put('/category/:id', (req, res) => {
    console.log(req.body)
    console.log("sss");
    res.status(200).json(category)
});

//delete
app.delete('/category/:id', (req, res) => {
     console.log(req.body)
});

//path for imge
app.use('/static', express.static(path.join('D:/project/elevate_knowlegde', 'public')))


app.listen(port,() => {
    console.log(`running on port ${port}`);
})