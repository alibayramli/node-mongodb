const express = require('express');
const  Blog = require('../models/blog');
const router = express.Router();

router.get('/blogs', (req, res) => {
    Blog.find().sort({createdAt: -1})
    .then((result) => {
        res.render('index', {title: 'All blogs', blogs: result})
    })
    .catch((err) => console.log(err))
})
  
router.post('/blogs', (req, res) => {
    const blogs = new Blog(req.body)
    blogs.save()
    .then(() => res.redirect('/blogs'))
    .catch((err) => console.log(err))
})
  
router.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new blog' });
});
  
router.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
    .then(result => {
        res.render('details', {blog: result, title: 'Blog details'});
        console.log(res)
    })
    .catch(err => console.log(err));
})  
  
router.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
    .then((result) => {
        res.json({redirect: '/blogs' })
    })
    .catch((err) => {
        console.log(err); 
    })
})

module.exports = router;
  