// frontend/src/components/EventList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EventList = ({ token }) => {
    const [events, setEvents] = useState([]);

    const fetchEvents = async () => {
        const response = await axios.get('http://localhost:5000/api/events');
        setEvents(response.data);
    };

    const deleteEvent = async (id) => {
        await axios.delete(`http://localhost:5000/api/events/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        fetchEvents(); // Refresh the event list
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <div>
            <h2>Event List</h2>
            <ul>
                {events.map(event => (
                    <li key={event._id}>
                        <h3>{event.title}</h3>
                        <p>{event.description}</p>
                        <p>{new Date(event.date).toLocaleString()}</p>
                        <p>{event.location}</p>
                        <button onClick={() => deleteEvent(event._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventList;