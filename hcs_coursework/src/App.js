import './App.css';
import React, { useState, useEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';


function App() {

  const [password, setPassword] = useState('');
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [emojislist, setEmojis] = useState([]);
  const [strengths, setStrengths] = useState({'8chars':false, 'lowercase': false, 'uppercase': false, 'number': false, 'symbol': false, 'containsEmoji': false, 'emojiKeywords': false, 'emojiPosition': false})
  const [strength, setStrength] = useState(0);

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

  useEffect(() => {
    // Perform strength checks here
    const checkStrength = () => {
      let tempStrength = 0;
      if (password.length > 8) tempStrength += 1;
      if (/[a-z]/.test(password)) tempStrength += 1;
      if (/[A-Z]/.test(password)) tempStrength += 1;
      if (/[1-9]/.test(password)) tempStrength += 1; 
      if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) tempStrength += 1; 
      setStrength(tempStrength);
    };

    checkStrength();
    console.log(password)
  }, [password]);

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
  

  const passwordChange = (e) => {
    setPassword((password) => password + e.emoji);
    // console.log(e.names[0]);
    keywordCheck(password,e.names[0]) //for i in range of words corresponding to that specific emoji - change "cat" with whatever key word we are looking for

  };

  const isEmoji = (char) => {
    const emojiRegex = /\p{Emoji}/u;
    console.log(emojiRegex.test(char))
    return emojiRegex.test(char); // if emoji, return true
  };

  const handleButton = () => {
    for (let i = 0; i < password.length; i++) {
      console.log(password.charAt(i));
      if (isEmoji(password.charAt(i))){
        console.log('here')
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Sign in using emoji password crazy fun vibes!</h2>
        <div style={{marginBottom: '40px'}}>To add emojis to your passwords use the emoji picker to the right! :D</div>

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

            <p>Password strength:</p>
            <p>{strength}</p>

          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-start', padding: '10px' }}>
          <EmojiPicker onEmojiClick={(emoji) => {
              passwordChange(emoji);
              keywordCheck(emoji.names);
            }}/>
          </div>

          <div style={{background:'grey'}}>
            <ul>
              <li></li>
            </ul>
          </div>
        </div>
      </header>
    </div>
  );
          }

export default App;
