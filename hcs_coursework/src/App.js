import './App.css';
import Home from './Home';
import ControlPage from './ControlPage';
import EmojiPasswordPage from './EmojiPasswordPage';
import React, { useState, useEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';

// export default function App() {
//   return (
//     <Router basename='/hcs_coursework'>
//         <Route path="/home">
//           <Home/>
//         </Route>
//         <Route path="/control">
//           <ControlPage/>
//         </Route>
//         <Route path="/emojiPassword">
//           <EmojiPasswordPage/>
//         </Route>
//     </Router>
//   );
// }




export default function App() {

  const [password, setPassword] = useState('');
  const [passwordChanged, setPasswordChanged] = useState(false);
  //const [emojiCheck, setEmojiCheck] = useState([]);
  const [emojislist, setEmojis] = useState([]);
  const [view, setView] = useState('home');

  // useEffect(() => {
    
  // }, [view])


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
                <input className='inputBox' placeholder="Enter your Password!" value={password} onChange={(e) => setPassword(e.target.value)} />
                
                <div>
                  <button className='submitButton' onClick={() => setView('control')} >
                    Back
                  </button>
                  <button className="submitButton">
                    Sign Up
                  </button>
                </div>

              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-start', padding: '10px' }}>
                <EmojiPicker onEmojiClick={(emoji) => {
                  passwordChange(emoji);
                  keywordCheck(emoji.names);
                }}/>
              </div>

            </div>
          </div>

        </header>
      </div>
      
    </div>
  );
}
