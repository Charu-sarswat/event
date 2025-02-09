// backend/routes/events.js
const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// Create a new event
router.post('/', async (req, res) => {
    const { title, description, date, location } = req.body;
    const newEvent = new Event({ title, description, date, location });

    try {
        const savedEvent = await newEvent.save();
        res.status(201).json(savedEvent);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get all events
router.get('/', async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get a single event
router.get('/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        res.status(200).json(event);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update an event
router.put('/:id', async (req, res) => {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedEvent);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete an event
router.delete('/:id', async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Event deleted' });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;