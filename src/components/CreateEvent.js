// frontend/src/components/CreateEvent.js
import React, { useState } from 'react';
import axios from 'axios';

const CreateEvent = ({ token }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/events', { title, description, date, location }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Event created successfully!');
        } catch (error) {
            console.error(error);
            alert('Error creating event');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Event Title" onChange={(e) => setTitle(e.target.value)} />
            <textarea placeholder="Event Description" onChange={(e) => setDescription(e.target.value)} />
            <input type="datetime-local" onChange={(e) => setDate(e.target.value)} />
            <input type="text" placeholder="Location" onChange={(e) => setLocation(e.target.value)} />
            <button type="submit">Create Event</button>
        </form>
    );
};

export default CreateEvent;