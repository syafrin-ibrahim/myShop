const express = require('express');
const router = express.Router();

module.exports = router;

router.get('/',(req, res)=>{
    res.send('admin area');
});

router.get('/add-page', (req,res)=>{
    const title = "";
    const slug = "";
    const content = "";

    res.render('admin/add_page', {
        title : title,
        slug : slug,
        content : content
    })
});