const express = require('express')
const router = express.Router()

const { isLoggedIn } = require('./../middlewares')
const { formatDate } = require('./../utils')


router.get('/perfil', isLoggedIn, (req, res) => {
    const now = new Date()
    res.render('pages/user/profile', { user: req.session.currentUser, now: formatDate(now) })
})

module.exports = router
