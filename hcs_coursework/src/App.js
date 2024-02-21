import './App.css';
import React, { useState, useEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';

export default function App() {

  const [password, setPassword] = useState('');
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [emojislist, setEmojis] = useState([]);
  const [view, setView] = useState('home');
  const [strengths, setStrengths] = useState({'Contains at least 8 characters':false, 'Contains a lowercase character': false, 'Contains an uppercase character': false, 'Contains a number': false, 'Contains a special character': false, 'Contains an emoji': false, 'emojiKeywords': false, 'Does not contain emoji at start or end': false})
  const [strength, setStrength] = useState(0);
  const [passwordList, setPasswordList] = useState([]);
  const [emojiKeywords, setEmojiKeywords] = useState([]);

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
    const newStrengths = { ...strengths };
  
    // Check if any word in the password matches any keyword
    const doesNotContainKeyword = !emojiKeywords.some(keyword => 
      password.split(' ').some(word => word.includes(keyword))
    );

    newStrengths['emojiKeywords'] = doesNotContainKeyword;

    setStrengths(newStrengths);
    console.log(doesNotContainKeyword);
    console.log(strengths['emojiKeywords'])
  }, [password, emojiKeywords]);

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const onEmojiClick = (emojiObject, event) => {
    // flattens all the keywords so it is not an array of arrays, and each word is taken into consideration
    const newKeywords = emojiObject.names.flatMap(keyword => keyword.split(' '));
    setEmojiKeywords((prevKeywords) => [...prevKeywords, ...newKeywords]);
    setPassword((prevPassword) => prevPassword + emojiObject.emoji);
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
    newStrengths['Does not contain emoji at start or end'] = emojiRegex.test(password.charAt(0));

    const passwordSymbols = Array.from(password);
    const startsWithEmoji = emojiRegex.test(passwordSymbols[0]);
    const endsWithEmoji = emojiRegex.test(passwordSymbols[passwordSymbols.length - 1]);
    newStrengths['Does not contain emoji at start or end'] = !startsWithEmoji && !endsWithEmoji;

    //check emoji position
  
    // Check if any word in the password matches any keyword
    const doesNotContainKeyword = !emojiKeywords.some(keyword => 
      password.split(' ').some(word => word.includes(keyword))
    );

    console.log(emojiKeywords);
    console.log(password.split(' '))


    newStrengths['emojiKeywords'] = doesNotContainKeyword;

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
      console.log('SIGN UP button');
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

              <div style={{ display: 'flex', justifyContent: 'flex-start', padding: '10px', marginRight: '20px'}}>
                Password must have at least 8 characters and at least 1 emoji.
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

                  <div className='strengthChecker'>
                    <p>Your password must meet the following conditions:</p>
                    <ul>
                      {Object.entries(strengths).map(([key, value]) => (
                        <li key={key}>{key}: {value ? "✓" : "✗"}</li>
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
