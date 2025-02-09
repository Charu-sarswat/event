// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import CreateEvent from './components/CreateEvent';
import EventList from './components/EventList';
import axios from 'axios';

const App = () => {
    const [token