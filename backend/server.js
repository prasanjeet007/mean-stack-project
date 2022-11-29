const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const Post = require('./models/post');
const postRoutes = require('./routes/posts');
const PORT = 3000;
mongoose.connect("mongodb+srv://prasanjeet:Prasan007@cluster0.k63hu56.mongodb.net/node-angular?retryWrites=true&w=majority").then(()=>{
    console.log('Connection connected successfully');
}).catch(()=>{
    console.log('Connection failed');
})
app.use(express.json());
app.use("/images",express.static(path.join("./images")));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE,OPTIONS');
    next();
});
app.use('/api/posts',postRoutes);
app.listen(process.env.PORT || PORT, () => {
    console.log('Server is running')
})