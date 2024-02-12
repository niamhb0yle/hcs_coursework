import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Emoji password crazy fun vibes!
        </p>
        <input style={{width:'200px', borderRadius:'30px', height:'30px', border:'none', padding:'10px', fontSize:'20px'}}>
        </input>
      </header>
    </div>
  );
}

export default App;
