import './App.css';
import React, { useState, useEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); 

const customStyles = {
  content: {
    top: '50%',
    left: '35%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '20vw',
  },
};

export default function App() {

  const [password, setPassword] = useState('');
  const [view, setView] = useState('home');
  const [strengths, setStrengths] = useState({'Contains at least 8 characters':false, 'Contains a lowercase character': false, 'Contains an uppercase character': false, 'Contains a number': false, 'Contains a special character': false, 'Contains an emoji': false, 'emojiKeywords': false, 'Does not contain emoji at start or end': false})
  const [strength, setStrength] = useState(0);
  const [submit, setSubmit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const newMap = new Map();
  const [emojiObjects, setEmojiObjects] = useState(newMap);

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const onEmojiClick = (emojiObject, event) => {
    // flattens all the keywords so it is not an array of arrays, and each word is taken into consideration
    const newKeywords = emojiObject.names.flatMap(keyword => keyword.split(' '));
    setPassword((prevPassword) => prevPassword + emojiObject.emoji);
    setEmojiObjects((prevObjects) => prevObjects.set(emojiObject.emoji, newKeywords));
  };

  useEffect(() => {
    const newStrengths = { ...strengths };
    newStrengths['Contains at least 8 characters'] = password.length >= 8;
    newStrengths['Contains a lowercase character'] = /[a-z]/.test(password);
    newStrengths['Contains an uppercase character'] = /[A-Z]/.test(password);
    newStrengths['Contains a number'] = /[0-9]/.test(password);
    newStrengths['Contains a special character'] = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(password);

    const emojiRegex = /[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]/;
    newStrengths['Contains an emoji'] = emojiRegex.test(password);

    const passwordSymbols = Array.from(password);
    const startsWithEmoji = emojiRegex.test(passwordSymbols[0]);
    const endsWithEmoji = emojiRegex.test(passwordSymbols[passwordSymbols.length - 1]);
    newStrengths['Does not contain emoji at start or end'] = !startsWithEmoji && !endsWithEmoji;

    let emojisInPassword = password.match(/[\p{Emoji}\u200d]+/gu);
    const containsKeyWord = passwordContainsKeyword(emojisInPassword);
  
    console.log("emojiObjects: ", emojiObjects);    
    console.log("pw contains emoji: ", emojisInPassword);
    console.log(password.split(' '))
    console.log(containsKeyWord)

    newStrengths['emojiKeywords'] = !containsKeyWord;

    setStrengths(newStrengths);

    let tempSubmit = true;

    for (let key in newStrengths) {
      if (newStrengths[key] == false) {
        tempSubmit = false;
      }
    }

    setSubmit(tempSubmit);

  }, [password]);

  const passwordContainsKeyword = (emojisInPassword) => {
    let containsKeyWord = false;
    if (emojisInPassword) { 
      emojisInPassword = emojisInPassword.flatMap((emoji) => [...emoji]); 
      for (const emoji of emojisInPassword) {
        if (emojiObjects.has(emoji)) {
          containsKeyWord = emojiObjects.get(emoji).some(keyword => 
            password.split(' ').some(word => word.includes(keyword))
          );
          if (containsKeyWord) { break; }
        }
      }
    }
    return containsKeyWord;
  }

  const handleButton = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>

      <div className="App">
        <header className="App-header">
          <h2>Create Passwords using Emojis</h2>

          <div className='home' style={{display: view === "home" ? 'block' : 'none'}}>
            <div style={{marginBottom: '40px', marginLeft: '40px', marginRight: '40px'}}>
                We are running a study to evaluate the impact of using emojis in passwords on the usability and security of the password.
            </div>
            <button className='submitButton' onClick={() => setView('control')} >
              Next
            </button>
          </div>

          <div className='control' style={{display: view === "control" ? 'block' : 'none'}}>
            <div style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between'}}>
              
              <div style={{marginRight: '20px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                <input className='inputBox' placeholder="Enter your username!"/>
                <input className='inputBox' placeholder="Enter your Password!" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-start', padding: '10px' }}>
                <EmojiPicker reactionsDefaultOpen={true} onEmojiClick={onEmojiClick}/>
              </div>

            </div>

            <div>
              <button className='submitButton' onClick={() => setView('home')} >
                Back
              </button>
              <button className="submitButton" onClick={() => setView('emojiPassword')}>
                Next
              </button>
            </div>

          </div>

          <div className='emojiPassword' style={{display: view === "emojiPassword" ? 'block' : 'none'}}>
            <div style={{marginBottom: '40px'}}>To add emojis to your passwords use the emoji picker to the right! :D</div>
            <div style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between'}}>
              <div style={{marginRight: '20px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                <input className='inputBox' placeholder="Enter your username!"/>
                <input className='inputBox' placeholder="Enter your Password!" value={password} onChange={handleChange} />
                
                <div>
                  <button className='submitButton' onClick={() => setView('control')} >
                    Back
                  </button>
                  <button className="submitButton" onClick={handleButton}>
                    Sign Up
                  </button>

                  <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    contentLabel="Criteria Not Met"
                    style={customStyles}
                  >
                    {submit ? 
                    <div>
                      <h1>Your password meets all the required criteria!</h1>
                    </div>
                     : 
                     <div>
                      <h1>Your password does not meet the required criteria - please try again!</h1>
                    </div>}
                    <button onClick={closeModal}>Close</button>
                  </Modal>

                  <div className='strengthChecker'>
                    <p>Your password must meet the following conditions:</p>
                    <ul style={{alignSelf:'left'}}>
                      {Object.entries(strengths).map(([key, value]) => (
                        <li  style={{alignSelf:'left'}} key={key}>{key}: <p style={{color: value ? 'green' : 'red', display:'inline', fontSize:'20px', fontWeight:'bold'}}>{value ? "✓" : "✗"}</p></li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-start', padding: '10px' }}>
                <EmojiPicker onEmojiClick={onEmojiClick}/>
              </div>

            </div>
          </div>

        </header>
      </div>
      
    </div>
  );
}
