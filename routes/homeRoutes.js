const express = require('express');
const router = express.Router();
//localhost:3001/
// GET home page
router.get('/', (req, res) => {

  
  res.render('homePage', { title: 'Home'});
});

router.get('/login', (req,res) => {
  res.render("login")
})

module.exports = router;