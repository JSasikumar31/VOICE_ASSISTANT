import React from 'react';
import "./App.css";
import panda from "./assets/panda.gif"; // AI illustration
import { FaMicrophone } from "react-icons/fa";
import { useContext } from 'react';
import { datacontext } from './context/UserContext';
import speakingGif from "./assets/speak.gif"; 
import aigif from "./assets/aiVoice.gif"

function App() {
  const { recognition, speaking, setSpeaking , Text ,response, setresponse ,setText} = useContext(datacontext);

  return (
    <div className={`main ${speaking ? 'speaking-mode' : ''}`}>
      {!speaking && (
        <>
          {/* AI Illustration */}
          <img src={panda} alt="AI Illustration" id="pandaa" className="ai-image" />
          <span className="ai-text">PANDAA HERE!</span>
        </>
      )}

      {/* Conditional Rendering of Button or Speaking GIF */}
      {!speaking ? (
        <button
          className="start-btn"
          onClick={() => {
            setSpeaking(true);
            setText("Listening....")
            if (recognition) {
              recognition.start(); // Start speech recognition
            } 
            setresponse(false)
          }}
        >
          Click me <FaMicrophone />
        </button>
      ) : (
        <div className="speaking-container">
          {!response ?
           <img src={speakingGif} alt="Speaking Animation" className='sspeak-img'/>
           :
           <img src={aigif} alt="Speaking Animation" className="aigif" />
          }
         
          <p className="listening-text">{Text}</p>
        </div>
      )}
    </div>
  );
}

export default App;
