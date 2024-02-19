import './ControlPage.css';
import React, { useState, useEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { Link } from 'react-router-dom';


function ControlPage() {
  return (
    <div className="ControlPage">
      <header className="ControlPage-header">
        <h2>Create Passwords using Emojis</h2>
        <div style={{marginBottom: '40px', marginLeft: '40px', marginRight: '40px'}}>
            We are running a study to evaluate the impact of using emojis in passwords on the usability and security of the password.
        </div>

        
        <Link to="/emojiPassword">Control Page</Link>

      </header>
    </div>
  );
}

export default ControlPage;
