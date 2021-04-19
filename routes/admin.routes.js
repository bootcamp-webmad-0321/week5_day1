const express = require('express')
const router = express.Router()

const { checkRoles, isLoggedIn } = require('./../middlewares')

// Endpoints
router.get('/panel', isLoggedIn, checkRoles('ADMIN'), (req, res) => {
    res.render('pages/admin/panel-page', { user: req.session.currentUser })
})

module.exports = router