const express = require('express');
const router = express.Router();
const Post = require('../models/post');

router.post('', (req,res) => {
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
router.get('', (req,res) => {
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

router.delete('/:id',(req,res)=>{
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

router.get('/:id',(req,res)=>{
    Post.findById({_id:req.params.id}).then((post)=>{
        res.status(200).json({
            message:'Post find successfully',
            posts:post
        });
    })
});

router.put('/:id',(req,res)=>{
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
module.exports = router;