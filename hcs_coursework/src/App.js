import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';


function App() {

  const emojiDict = {
    'dog': '🐶',
    'smiley': '😃',
    'pizza': '🍕'
  }
  const [password, setPassword] = useState();

  const addEmoji = (emoji) => {
    setPassword(password + emoji)
    console.log(password)

    keywordCheck(password,"cat") //for i in range of words corresponding to that specific emoji - change "cat" with whatever key word we are looking for
  }

  const keywordCheck = (password, keyWord) => {
    let emojiInPassword = password.includes(keyWord);
    console.log(emojiInPassword);
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Emoji password crazy fun vibes!</p>

        <div style={{display:'flex', justifyContent:'flex-start', background:'pink', margin:'10px'}}>
          <button className="emojiButtons" onClick={() => addEmoji('🐶')}>
            <EmojiPicker />
          </button>
        </div>

        <input
          style={{
            width: '400px',
            borderRadius: '30px',
            height: '30px',
            border: 'none',
            padding: '10px',
            fontSize: '20px',
          }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </header>
    </div>
  );
}

export default App;
