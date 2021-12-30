const router = require('express').Router()
const { Post, Comment, User } = require('../models')

router.get('/', (req, res) => {
    res.render('homepage')
});

router.get('/login', (req, res) => {
    res.render('login')
});

router.get('/signup', (req, res) => {
    res.render('signup')
});

router.get('/comments', (req, res) => {
    res.render('comments')
});

router.get('/view-posts', (req, res) => {
   Post.findAll({
      include: [
          {
              model: Comment,
              include: [
                  {
                      model: User,
                  }
              ]
          },{
              model: User,
          }
      ]
   }) 
   .then(postData => {
     const posts = postData.map(post => {
         return post.get({
             plain: true
         })
     }) 

    console.log(posts);

    res.render('view-posts', {posts})
   })


});

router.get('/create-post', (req, res) => {
    res.render('create-post')
});

router.get('/about', (req, res) => {
    res.render('about')
})


module.exports = router;