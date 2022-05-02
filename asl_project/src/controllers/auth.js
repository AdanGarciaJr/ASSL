const express = require('express')
const router = express.Router()
const request = require('request')
const querystring = require('querystring')
const { LoginToken } = require('../models/index')

router.get('/login', (req,res) => {
    res.render('auth/login')
})

router.get('/callback', async (req, res) => {
    const { code } = req.query
    await request({
        uri: 'https://github.com/login/oauth/access_token',
        qs: {
            client_id: '53f05ffe1d5763a25810',
            client_secret: 'a72297415bab6405d893af4104fc476387f4c7be',
            code
        }

    }, async (error, response, body) => {
        const { access_token } = querystring.parse(body)
        req.session.access_token = access_token
        res.redirect('/')
    })
})



//token
//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

//ee17f3e5069045a466b

module.exports = router