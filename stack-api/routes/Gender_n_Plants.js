const express = require('express')
var router = express.Router()
const axios = require('axios')

router.post('/betta',(req,res)=>{
    const url ='http://localhost:8888/betta'
    console.log(req.body.img_url)
    const data = JSON.stringify({ img_url:req.body.img_url});
    axios.post(url,data, {
        headers: { "Content-Type": "application/json" },
    })
    .then((data) => {
        console.log(data.data)
        res.send(JSON.stringify({"data":data.data}))
    });
})

router.post('/guppy',(req,res)=>{
    const url ='http://localhost:8888/guppy'
    console.log(req.body.img_url)
    const data = JSON.stringify({ img_url:req.body.img_url});
    axios.post(url,data, {
        headers: { "Content-Type": "application/json" },
    })
    .then((data) => {
        console.log(data.data)
        res.send(JSON.stringify({"data":data.data}))
    });
})

router.post('/goldfish',(req,res)=>{
    const url ='http://localhost:8888/goldfish'
    console.log(req.body.img_url)
    const data = JSON.stringify({ img_url:req.body.img_url});
    axios.post(url,data, {
        headers: { "Content-Type": "application/json" },
    })
    .then((data) => {
        console.log(data.data)
        res.send(JSON.stringify({"data":data.data}))
    });
})

router.post('/plants',(req,res)=>{
    const url ='http://localhost:8888/plants'
    console.log(req.body.img_url)
    const data = JSON.stringify({ img_url:req.body.img_url});
    axios.post(url,data, {
        headers: { "Content-Type": "application/json" },
    })
    .then((data) => {
        console.log(data.data)
        res.send(JSON.stringify({"data":data.data}))
    });
})

module.exports = router