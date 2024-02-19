import './App.css';
import Home from './Home';
import ControlPage from './ControlPage';
import EmojiPasswordPage from './EmojiPasswordPage';
import React, { useState, useEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { Router, Route } from 'react-router-dom';

export default function App() {
  return (
    <Router>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/control">
          <ControlPage />
        </Route>
        <Route path="/emojiPassword">
          <EmojiPasswordPage />
        </Route>
    </Router>
  );
}