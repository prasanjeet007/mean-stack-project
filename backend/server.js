const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const Post = require('./models/post');
const PORT = 3000;
mongoose.connect("mongodb+srv://prasanjeet:Prasan007@cluster0.k63hu56.mongodb.net/node-angular?retryWrites=true&w=majority").then(()=>{
    console.log('Connection connected successfully');
}).catch(()=>{
    console.log('Connection failed');
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE,OPTIONS');
    next();
});
app.post('/api/posts', (req,res) => {
    const post = new Post({
        title: req.body.title,
        content:req.body.content
    });
 post.save().then((data)=>{
    res.status(201).json({
        message: "Post created Successfully",
        posts: data
       })
 })
})
app.get('/api/posts', (req,res) => {
   Post.find().then((posts)=> {
    res.status(200).json({
        message:'Post fetched Successfully!',
        posts: posts
    });
    }).catch((err) => {
        res.status(400).json({
           err: err
        }); 
    })
});

app.delete('/api/posts/:id',(req,res)=>{
    Post.findByIdAndDelete({_id:req.params.id}).then((data)=>{
        res.status(200).json({
            message:'Post Delete Successfully',
            posts:data
        });
    }).catch((err)=>{
        res.status(400).json({
            err:err
        })
    })
});

app.get('/api/posts/:id',(req,res)=>{
    Post.findById({_id:req.params.id}).then((post)=>{
        res.status(200).json({
            message:'Post find successfully',
            posts:post
        });
    })
});

app.put('/api/posts/:id',(req,res)=>{
    Post.findByIdAndUpdate({_id:req.params.id},{$set:{
        title:req.body.title,
        content:req.body.content
    }},{new:true},(err,post)=>{
        res.status(200).json({
            message:'Post update successfully',
            posts:post
        });
    });
});

app.listen(process.env.PORT || PORT, () => {
    console.log('Server is running')
})