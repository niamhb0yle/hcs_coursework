import './App.css';
import React, { useState, useEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';


function App() {

  const [password, setPassword] = useState('');
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [emojislist, setEmojis] = useState([]);
  const [strengths, setStrengths] = useState({'Contains at least 8 characters':false, 'Contains a lowercase character': false, 'Contains an uppercase character': false, 'Contains a number': false, 'Contains a special character': false, 'Contains an emoji': false, 'emojiKeywords': false, 'Does not contain emoji at start or end': false})
  const [strength, setStrength] = useState(0);
  const [passwordList, setPasswordList] = useState([]);
  const [emojiKeyword, setEmojiKeyword] = useState(false);

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

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const onEmojiClick = (emojiObject, event) => {
    setPassword((prevPassword) => prevPassword + emojiObject.emoji);
  };

  const addToPassword = (item, type) => {
    setPasswordList((prev) => [...prev, { type, value: item }]);
  };

  useEffect(() => {
    const hasEmoji = passwordList.some(item => item.type === "emoji");
    const startsOrEndsWithEmoji = passwordList.length > 0 && (passwordList[0].type === "emoji" || passwordList[passwordList.length - 1].type === "emoji");
    
    console.log("Has Emoji:", hasEmoji);
    console.log("Valid Position:", !startsOrEndsWithEmoji);
    // Implement other checks as needed
  }, [passwordList]);

  useEffect(() => {
    const newStrengths = { ...strengths };
    newStrengths['Contains at least 8 characters'] = password.length >= 8;
    newStrengths['Contains a lowercase character'] = /[a-z]/.test(password);
    newStrengths['Contains an uppercase character'] = /[A-Z]/.test(password);
    newStrengths['Contains a number'] = /[0-9]/.test(password);
    newStrengths['Contains a special character'] = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(password);

    const emojiRegex = /[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]/;
    newStrengths['Contains an emoji'] = emojiRegex.test(password);
    newStrengths['Does not contain emoji at start or end'] = emojiRegex.test(password.charAt(0));

    const passwordSymbols = Array.from(password);
    const startsWithEmoji = emojiRegex.test(passwordSymbols[0]);
    const endsWithEmoji = emojiRegex.test(passwordSymbols[passwordSymbols.length - 1]);
    newStrengths['Does not contain emoji at start or end'] = !startsWithEmoji && !endsWithEmoji;

    //check emoji position

    setStrengths(newStrengths);
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
    setEmojiKeyword(emojiInPassword);
  }
  

  const passwordChange = (e) => {
    setPassword((password) => password + e.emoji);
    setEmojis([...emojislist, [e]]);
    setPasswordChanged(true);
  };

  useEffect(() => {
    keywordCheck(findEmojis(password));
    setPasswordChanged(false);
  }, [passwordChanged]);

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
              onChange={handleChange}
            />
            <button className='submitButton'
              onClick={handleButton}
              >
              Sign Up
            </button>

            <div className='strengthChecker'>
              <p>Your password must meet the following conditions:</p>
              <ul>
                {Object.entries(strengths).map(([key, value]) => (
                  <li key={key}>{key}: {value ? "✓" : "✗"}</li>
                ))}
              </ul>
            </div>

          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-start', padding: '10px' }}>
          <EmojiPicker onEmojiClick={onEmojiClick}/>
          </div>

          
        </div>
      </header>
    </div>
  );
}

export default App;