const express = require('express')
const router = express.Router()
const { Question } = require('../models/')
const bodyParser = require('body-parser')
const { isAuthenticated } = require('../middlewares/auth')
router.use(bodyParser.urlencoded({ extended: false}))

router.get('/', isAuthenticated,async (req,res) => {
    const questions = await Question.findAll()
    if(req.headers.accept.indexOf('/json') > -1){
        res.json(questions)
    } else {
        res.render('question/index', { questions })
    } 
})

router.get('/new', isAuthenticated,(req,res) => {
    res.render('question/create')
})

router.post('/', isAuthenticated,async (req,res) => {
    const quest = await Question.create(req.body)
    if(req.headers.accept.indexOf('/json') > -1){
        res.json(quest)
    } else {
        res.redirect('/questions/' + quest.id)
    } 
})

router.get('/:id', isAuthenticated,async (req,res) => {
    const quest = await Question.findByPk(req.params.id)
    
    if(req.headers.accept.indexOf('/json') > -1){
        res.json(quest)
    } else {
        res.render('question/show', {quest})
    } 
})

router.get('/:id/edit', isAuthenticated,async (req,res) => {
    const quest = await Question.findByPk(req.params.id)
    res.render('question/edit', {quest})
})

router.post('/:id', isAuthenticated,async (req,res) => {
    const { name } = req.body
    const { id } = req.params
    const quest = await Question.update(req.body, {
        where: { ...req.params }
    })
    
    if(req.headers.accept.indexOf('/json') > -1){
        res.json(quest)
    } else {
        res.redirect('/questions/' + id)
    } 
    
})

router.get('/:id/delete', isAuthenticated,async (req,res) => {
    const { id } = req.params
    const deleted = await Question.destroy({
        where: { id }
    })
    if(req.headers.accept.indexOf('/json') > -1){
        res.json({'success': deleted})
    } else {
        res.redirect("/questions")
    } 
    
})
module.exports = router