const express = require('express');
const router = express.Router();
const EventModel = require('../models/EventModel');

//middlewares
router.use(express.json());

//get all events
router.get('/', async(req, res) => {
    try{
        const allEvents = await EventModel.find({})
        res.status(200).send(allEvents)
    } catch (err) {
        res.status(500).send('problem')
    }
})

//get history events
router.get('/history', async(req, res) => {
    const rightNow = new Date();
    try{
        const events = await EventModel.find({ date: { $lte: rightNow }})
        res.status(200).send(events)
    } catch (err) {
        res.status(500).send('problem')
    }
})


//get upcoming events
router.get('/upcoming', async(req, res) => {
    const rightNow = new Date();
    try{
        const events = await EventModel.find({ date: { $gte: rightNow }})
        res.status(200).send(events)
    } catch (err) {
        res.status(500).send('problem')
    }
})

//get event by Id
router.get('/:id', async(req, res) => {
    try{
        const event = await EventModel.findById(req.params.id)
        res.status(200).send(event)
    } catch (err){
        res.status(500).send('no event')
    }
})

//create event
router.post('/', async(req, res) =>{
    const { data } = req.body
    const event = new Event({
        title: data.title,
        description: data.description,
        date: data.date,
        location: data.location,
        owner: data.owner,
        participants: [data.owner]
    })
    try{
        const newEvent = await event.save()
        res.status(200).send(newUser)
    } catch (err){
        res.status(500).send('no event')
    }

})

//remove event
router.delete('/:id', async(req, res) => {
    const {event} = req.params.id
    try{
        const removedEvent = await EventModel.findByIdAndRemove({event})
        res.status(200).send('event has been deleted') 
    } catch (err) {
        res.status(500).send('problem')
    }
})

//update event
router.put('/:id', async(req, res) => {
    const { data } = req.body
    const event = {...data}
    try{
        const updatedEvent = await EventModel.findByIdAndUpdate( req.params.id , event, {new: true} )
        res.status(200).send(updatedEvent)
    } catch (err){
        res.status(500).send(err)
    }
})

//participate in event
router.put('/part/:id', async(req, res)=>{
    
})

module.exports = router;