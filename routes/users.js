const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel');
const { route } = require('./events');

//middlewares
router.use(express.json());

//get all users
router.get('/', async(req, res) =>{
    try{
        const allUsers = await UserModel.find({})
        res.status(200).send(allUsers)
    } catch (err) {
        res.status(500).send('something went wrong')
    }

})

//get user by Id
router.get('/:id', async(req, res) =>{
    const { id } = req.params
    try{
        const user = await UserModel.findById({id})
        res.status(200).send(user)
    } catch (err) {
        res.status(500).send('the user does not exist')
    }

})

//update user


//remove user
router.delete('/:id', async(req, res) =>{
    const { id } = req.params
    try{
        const user = await UserModel.findByIdAndRemove({id})
        res.status(200).send('the user successfully deleted')
    } catch (err) {
        res.status(500).send('the user does not exist')
    }

})

//user create event

//user participate in event

module.exports = router;