const express = require('express')
var router = express.Router()
const axios = require('axios')

router.post('/upload',(req,res)=>{
    const url ='http://localhost:9999/fish'
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