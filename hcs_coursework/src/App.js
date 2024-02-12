import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { Picker } from 'emoji-mart';


function App() {

  const emojiDict = {
    'dog': '🐶',
    'smiley': '😃',
    'pizza': '🍕'
  }
  const [password, setPassword] = useState('');

  const addEmoji = (e) => {
    setPassword((password) =>password + e.emoji);
    console.log(password);
    console.log(e.names[0]);
    //keywordCheck(password,e.names[0]) //for i in range of words corresponding to that specific emoji - change "cat" with whatever key word we are looking for

  }

  const keywordCheck = (password, keyWord) => {
    let emojiInPassword = password.includes(keyWord);
    console.log(emojiInPassword);
  }




  return (
    <div className="App">
      <header className="App-header">
        <h2>Sign in using emoji password crazy fun vibes!</h2>

        <div>
        <input
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
        </div>

        <div style={{display:'flex', justifyContent:'flex-start', background:'red', margin:'10px'}}>
          <EmojiPicker onEmojiClick={(emoji) => addEmoji(emoji)}/>
        </div>

      </header>
    </div>
  );
}

export default App;
