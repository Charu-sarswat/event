// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import axios from 'axios';
import Login from './components/Login';
import Signup from './components/Signup';
// import Dashboard from './components/Dashboard';
// import Home from './components/Home';

// ProtectedRoute component
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/login" />;
};

const App = () => {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [userCount, setUserCount] = useState(0);


    // Save token to localStorage when updated
useEffect(() => {
    if (token) {
        localStorage.setItem('token', token);
    } else {
        localStorage.removeItem('token');
    }
}, [token]);

// Fetch user count
useEffect(() => {
    const fetchUserCount = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/users/count');
            setUserCount(response.data.count);
        } catch (error) {
            console.error('❌ Error fetching user count:', error);
        }
    };
    fetchUserCount();
}, []);

const handleSetToken = (newToken) => {
    setToken(newToken);
};

const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
        handleSetToken(null);
    }
};

return (
    <Router>
        <div>
            <h1>Event Management System</h1>
            <p>Current User Count: {userCount}</p>
            
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    {!token ? (
                        <>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/signup">Sign Up</Link></li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/dashboard">Dashboard</Link></li>
                            <li><Link to="/events">View Events</Link></li>
                            <li><Link to="/create-event">Create Event</Link></li>
                            <li><button onClick={handleLogout}>Logout</button></li>
                        </>
                    )}
                </ul>
            </nav>

            <Routes>
                <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Home />} />
                <Route path="/login" element={!token ? <Login setToken={handleSetToken} /> : <Navigate to="/dashboard" />} />
                <Route path="/signup" element={!token ? <Signup /> : <Navigate to="/dashboard" />} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard token={token} /></ProtectedRoute>} />
                <Route path="/create-event" element={<ProtectedRoute><CreateEvent token={token} /></ProtectedRoute>} />
                <Route path="/events" element={<ProtectedRoute><EventList token={token} /></ProtectedRoute>} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </div>
    </Router>
);
};

export default App;