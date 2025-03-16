import React, { createContext, useState } from 'react';
import run from '../GEMINI';

export const datacontext = createContext();

function UserContext({ children }) {
    const [speaking, setSpeaking] = useState(false);
    let [Text, setText] = useState("Listening.." )
    let [response, setresponse]= useState(false)
    function speak(text) {
        try {
            const text_speak = new SpeechSynthesisUtterance(text);
            text_speak.volume = 1;
            text_speak.rate = 1;
            text_speak.pitch = 1;
            text_speak.lang = 'en-GB';
            window.speechSynthesis.speak(text_speak);
        } catch (error) {
            console.error("Error in speaking text:", error);
        }
    }

    async function aiResponse(prompt) {
        try {
            const text = await run(prompt)
            
           // let newText = text.split("**")&&text.split("*")&&text.split("***")&&text.replace("google","Sasi Kumar")
            
           var newText = text.split("**").join(" ");
           var  newText = text.split("*").join(" ");
           var newText = text.split("***").join(" ");

            newText = text.replace("google", "Sasi Kumar");
            newText = text.replace("Google", "Sasi Kumar");

            setText(newText)
            speak(newText);
            setresponse(true)
            setTimeout(()=> {
              setSpeaking(false)
            },8000)
            
             
        } catch (error) {
            console.error("Error in AI response:", error);
        }
    }

    const speechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

    let recognition = null;

    if (speechRecognition) {
        recognition = new speechRecognition();
        recognition.lang = 'en-GB';
        recognition.onresult = (e) => {
            const transcript = e.results[0][0].transcript;
            console.log('Recognized Speech:', transcript);
            setText(transcript)
            takecommand(transcript.toLowerCase())

            
        };
    } //customize openings
   function takecommand(command){ 
    if(command.includes("open") && command.includes("youtube")){
      window.open("https://www.youtube.com/","_blank")
      speak("OPENING YOUTUBE..")
      setText("Opning Youtube..")
    }
    if(command.includes("open") && command.includes("whatsapp")){
      window.open("https://web.whatsapp.com/","_blank")
      speak("OPENING Whatsapp")
      setText("Opening whatsaap")
    }

      if(command.includes("pic") && command.includes("panda")){
        window.open("https://drive.google.com/file/d/1AJLf9QIwsC5vtR0Xz7gAaY7Osva0wTC0/view?usp=drive_link/","_blank")
        speak("OPENING pandaa jii pic")
        setText("Opening panda pic")}
    else{
        aiResponse(command)
    }
   }
    const value = {
        recognition, // Null if SpeechRecognition isn't supported
        speak, // Expose the speak function
        speaking,
        setSpeaking,
        Text,
        setText,response,setresponse
        
    };

    return (
        <datacontext.Provider value={value}>
            {children}
        </datacontext.Provider>
    );
}

export default UserContext;
