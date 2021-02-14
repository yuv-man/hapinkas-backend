const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel');
const { route } = require('./events');
const cloudinary = require('../utils/cloudinary');
const upload = require("../utils/multer");


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
        const user = await UserModel.findById( id )
        res.status(200).send(user)
    } catch (err) {
        res.status(500).send('the user does not exist')
    }
})

//update user
router.put('/:id', upload.single('profileImage'), async (req, res) => {
	try {
		let user = await UserModel.findById(req.params.id);
		//remove old picture from cloudinary
		if (user.cloudinaryId) {
			await cloudinary.uploader.destroy(user.cloudinaryId);
		}
		let updateUser;
		//add updated picture to cloudinary
		if (req.file) {
			const result = await cloudinary.uploader.upload(req.file.path);
			updateUser = {
				...req.body,
				profileImage: result.secure_url || user.profileImage,
				cloudinaryId: result.public_id || user.cloudinaryId,
			};
		} else {
			updateUser = { ...req.body };
			console.log(updateUser)
		}
		//update user in database
		user = await UserModel.findByIdAndUpdate(req.params.id, updateUser, { new: true });
		res.status(200).send(user);
	} catch (err) {
		console.log(err);
		res.status(500).send('user has not been updated');
	}
});

//remove user
router.delete('/:id', async(req, res) =>{
    const { id } = req.params
    try{
        const user = await UserModel.findByIdAndRemove( id )
        res.status(200).send('the user successfully deleted')
    } catch (err) {
        res.status(500).send('the user does not exist')
    }
})

//user create event
router.put('/createEvent/:id', async(req, res) =>{
    const { id } = req.params
    const { eventId } = req.body
    try{
        const user = await UserModel.findByIdAndUpdate( id , 
            { $push: { myEvents: eventId }}, { new: true });
        res.status(200).send('the event has created')
    } catch (err) {
        res.status(500).send(err)
    }
})

//user remove event
router.put('/removeEvent/:id', async(req, res) =>{
    const { id } = req.params
    const { eventId } = req.body
    try{
        const user = await UserModel.findByIdAndUpdate( id , 
            { $pull: { myEvents: eventId }}, { new: true });
        res.status(200).send('the event has been deleted')
    } catch (err) {
        res.status(500).send(err)
    }
})

//user participate in event
router.put('/participate/:id', async(req, res) =>{
    const { id } = req.params
    const { eventId } = req.body
    try{
        if (!user.events.includes(eventId)) {
        const user = await UserModel.findByIdAndUpdate( id, 
            { $push: { events: eventId }}, { new: true });
        res.status(200).send('another participant')
        } else {
        const user = await UserModel.findByIdAndUpdate( id , 
            { $pull: { events: eventId }}, { new: true });
        res.status(201).send('minus participant')
        }
    } catch (err) {
        res.status(500).send(err)
    }
})


module.exports = router;
