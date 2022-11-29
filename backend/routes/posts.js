const express = require('express');
const multer = require('multer');
const router = express.Router();
const Post = require('../models/post');
const MIME_TYPE_MAP = {
    'image/png':'png',
    'image/jpeg':'jpg',
    'image/jpg':'jpg'
}
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let err = new Error('Invalid File Extension');
        if(isValid) {
          err = null;
        }
        cb(err,"./images");
    },
    filename:(req,file,cb)=>{
       const name = file.originalname.toLocaleLowerCase().split(' ').join('-');
       const extension = MIME_TYPE_MAP[file.mimetype];
       cb(null,`${name}-${Date.now()}.${extension}`);
    }
})

router.post('',multer({storage:storage}).single("image"), (req,res) => {
    const post = new Post({
        title: req.body.title,
        content:req.body.content,
        image: req.protocol+'://'+req.get("host")+"/images/"+req.file.filename
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

router.put('/:id',multer({storage:storage}).single("image"),(req,res)=>{
    let imagePath;
    if(req.file) {
        const url = req.protocol+'://'+req.get("host");
      imagePath =  url +"/images/"+req.file.filename;
    }
    const postData = new Post({
        _id:req.body.id,
        title: req.body.title,
        content:req.body.content,
        image: imagePath
    });
    Post.findOneAndUpdate({_id:req.body.id},postData).then(post =>{
        res.status(200).json({
            message:'Post update successfully',
            posts:post
        });
    });
});
module.exports = router;