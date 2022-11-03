const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE,OPTIONS');
    next();
});
app.post('/api/posts', (req,res) => {
   res.status(201).json({
    message: "Post created Successfully",
    posts: req.body
   })
})
app.get('/api/posts', (req,res) => {
    const posts = [
        {id:1000, title:'First server-side post', content:'This is coming from the server'},
        {id:1001, title:'Second server-side post', content:'This is coming from the server'},
        {id:1002, title:'Third server-side post', content:'This is coming from the server'}
    ]
    res.status(200).json({
        message:'Post fetched Successfully!',
        posts: posts
    });
});

app.listen(process.env.PORT || PORT, () => {
    console.log('Server is running')
})