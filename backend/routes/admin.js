const express = require('express');
const router = express.Router();
const Post = require('../server/models/Post');

const adminLayout = '../views/layouts/admin'

router.get('/admin', async (req, res) => {
    try {
        //const data = await Post.find();
        res.render('./admin/index', { layout: adminLayout });

    } catch (error) {
        console.log(error);
    }
});
router.get('/admin/dashboard', async (req, res) => {
    try {
        const data = await Post.find();
        res.render('./admin/dashboard', { data, layout: adminLayout });

    } catch (error) {
        console.log(error);
    }
});
router.get('/admin/unauth', async (req, res) => {
    try {

        res.render('./admin/unauth', { layout: adminLayout });

    } catch (error) {
        console.log(error);
    }
});


router.post('/admin', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (req.body.username === process.env.ADMIN && req.body.password === process.env.PASS) {
            res.redirect('./admin/dashboard')
        }
        else {
            res.redirect('./admin/unauth');
        }

    } catch (error) {
        console.log(error);
    }
});

router.get('/admin/post/:id', async (req, res) => {
    try {
        let slug = req.params.id;

        const data = await Post.findById({ _id: slug });

        res.render('./admin/post', { data , layout: adminLayout});
    } catch (error) {
        console.log(error);
    }

});

router.get('/admin/edit-post/:id', async (req, res) => {
    try {
        const data = await Post.findOne({ _id: req.params.id });
        res.render('./admin/edit-post', { data , layout: adminLayout})
    } catch (error) {
        console.log(error);
    }

});
router.put('/admin/edit-post/:id', async (req, res) => {
    try {

        await Post.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            author: req.body.author,
            body: req.body.body,
            updatedAt: Date.now()
        });

        res.redirect(`/admin/post/${req.params.id}`);

    } catch (error) {
        console.log(error);
    }

});



router.delete('/admin/delete-post/:id', async (req, res) => {

    try {
        await Post.deleteOne({ _id: req.params.id });
        res.redirect('/admin/dashboard');
    } catch (error) {
        console.log(error);
    }

});

module.exports = router;