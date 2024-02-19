import './App.css';
import React, { useState, useEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';


function App() {

  const [password, setPassword] = useState('');
  const [passwordChanged, setPasswordChanged] = useState(false);
  //const [emojiCheck, setEmojiCheck] = useState([]);
  const [emojislist, setEmojis] = useState([]);

  const findEmojis = (pass) => {
    const x =/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;
    const emojis = pass.match(x) || [];
    const codePoints = Array.from(emojis).map((char) => char.codePointAt(0).toString(16));
    const emojisWithNames = emojislist.map((emoji) => {
      const x = emoji[0];
      var i;
      for (i=0; i <= emojis.length; i++){
        if (x.emoji == emojis[i]){ 
          // console.log(x.names);
          return (x.names[0] + " " + x.names[1]).split(" ");
        }
      }
    });
    return emojisWithNames;
  };


  const passwordChange = (e) => {
    setPassword((password) => password + e.emoji);
    setEmojis([...emojislist,  [e]]);
    setPasswordChanged(true);
  }

  useEffect(() => {
    keywordCheck(findEmojis(password));
    setPasswordChanged(false);
  }, [passwordChange])

  const keywordCheck = (names) => {
    let emojiInPassword = false;
    for (let i = 0; i < names.length; i++) {
      if (typeof names[i] !== 'undefined') {
        for (let j = 0; j < i+1; j++ ) {
            if (password.toLowerCase().includes(names[i][j]) && names[i][j].length > 2) {
              emojiInPassword = true;
            }
        }
      }
    }
    console.log(emojiInPassword);
  }

  const handleButton = () => {
      console.log('SIGN UP button');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Sign in using emoji password crazy fun vibes!</h2>
        <div style={{marginBottom: '40px'}}>To add emojis to your passwords use the emoji picker to th right! :D</div>

        <div style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between'}}>
          <div style={{marginRight: '20px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
            <input
              placeholder="Enter your username!"
              style={{
                width: '400px',
                borderRadius: '30px',
                height: '30px',
                border: 'none',
                padding: '10px',
                fontSize: '20px',
                margin: '20px'
              }}        
            />

            <input
              placeholder="Enter your Password!"
              style={{
                width: '400px',
                borderRadius: '30px',
                height: '30px',
                border: 'none',
                padding: '10px',
                fontSize: '20px',
                margin: '20px'
              }}
              value={password}
              //onChange={(e) => addEmoji(e.target.value)}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              style={{
                width: '100px',
                color: 'white',
                background: 'gray',
                borderRadius: 'none',
                height: '50px',
                border: 'none',
                padding: '10px',
                fontSize: '20px',
                margin: '20px'
              }}
              onClick={handleButton}
              >
              Sign Up
            </button>

          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-start', padding: '10px' }}>
          <EmojiPicker onEmojiClick={(emoji) => {
              passwordChange(emoji);
              keywordCheck(emoji.names);
            }}/>
          </div>
        </div>
      </header>
    </div>
  );
          }

export default App;
