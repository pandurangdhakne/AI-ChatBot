 
// import './App.css';
// import { ChatbotIcon } from './Components/ChatbotIcon';
// import { ChatForm } from './Components/ChatForm';
// import { ChatMessage } from './Components/ChatMessage';
// import { useState } from 'react';
// // import dotenv from "dotenv";

// // dotenv.config();

// function App() {
//   const [chatHistory, setChatHistory] = useState([]);

//  const generateBotResponse = async (history) => {
//   const updateHistory = (text) => {
//     setChatHistory((prev) => [
//       ...prev.filter((msg) => msg.text !== 'Thinking ...'),
//       { role: 'model', text },
//     ]);
//   };

//   const formattedHistory = history.map(({ role, text }) => ({
//     role,
//     parts: [{ text }],
//   }));

//   const API_KEY = import.meta.env.VITE_API_KEY;

//   const apiURL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

// console.log(API_KEY);

//   const requestOption = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ contents: formattedHistory }),
//   };

//   try {
//     const response = await fetch(apiURL, requestOption);
//     const text = await response.text();

//     if (!response.ok || !text) {
//       throw new Error(`API error: ${response.status} - ${text}`);
//     }

//     const data = JSON.parse(text);

//     // 🛠️ Safe access with fallback
//     const message = data?.candidates?.[0]?.content?.parts?.[0]?.text;

//     if (!message) {
//       console.error("API returned unexpected format:", data);
//       throw new Error("API response structure unexpected or empty.");
//     }

//     const cleanedText = message.replace(/\*\*(.*?)\*\*/g, "$1").trim();
//     updateHistory(cleanedText);
//   } catch (error) {
//     console.error("API Error:", error);
//     updateHistory("⚠️ Failed to get response from Gemini API.");
//     alert("Error: " + error.message);
//   }
// };


//   return (
//     <>
//       <div className="container">
//         <div className="chatbot-popup">
//           {/* ChatBot Header */}
//           <div className="chat-header">
//             <div className="header-info">
//               <ChatbotIcon />
//               <h2 className="logo-text">Chat-Bot</h2>
//             </div>

//             <button className="material-symbols-rounded">keyboard_arrow_down</button>
//           </div>

//           {/* ChatBot Body */}
//           <div className="chat-body">
//             <div className="message bot-message">
//               <ChatbotIcon />
//               <p className="message-text">
//                 Hey there 👋 <br />
//                 How can I help you
//               </p>
//             </div>

//             {/* Render the chat history dynamically */}
//             {chatHistory.map((chat, index) => (
//               <ChatMessage key={index} chat={chat} />
//             ))}
//           </div>

//           {/* ChatBot Footer */}
//           <div className="chat-footer">
//             <ChatForm
//               chatHistory={chatHistory}
//               setChatHistory={setChatHistory}
//               generateBotResponse={generateBotResponse}
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default App;



//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


import './App.css';
import { ChatbotIcon } from './Components/ChatbotIcon';
import { ChatForm } from './Components/ChatForm';
import { ChatMessage } from './Components/ChatMessage';
import { useState } from 'react';

function App() {
  const [chatHistory, setChatHistory] = useState([]);

  const generateBotResponse = async (history) => {
    const updateHistory = (text) => {
      setChatHistory((prev) => [
        ...prev.filter((msg) => msg.text !== 'Thinking ...'),
        { role: 'model', text },
      ]);
    };

    const formattedHistory = history.map(({ role, text }) => ({
      role,
      parts: [{ text }],
    }));

    try {
      // 🔹 Async "fetch" of API key from env
      const API_KEY = await new Promise((resolve) => {
        resolve(import.meta.env.VITE_API_KEY);
      });

      if (!API_KEY) {
        throw new Error("API key is missing. Check your .env file.");
      }

      const apiURL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;
      console.log("Using API key:", API_KEY);

      const requestOption = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contents: formattedHistory }),
      };

      const response = await fetch(apiURL, requestOption);
      const text = await response.text();

      if (!response.ok || !text) {
        throw new Error(`API error: ${response.status} - ${text}`);
      }

      const data = JSON.parse(text);

      const message = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!message) {
        console.error("API returned unexpected format:", data);
        throw new Error("API response structure unexpected or empty.");
      }

      const cleanedText = message.replace(/\*\*(.*?)\*\*/g, "$1").trim();
      updateHistory(cleanedText);

    } catch (error) {
      console.error("API Error:", error);
      updateHistory("⚠️ Failed to get response from Gemini API.");
      alert("Error: " + error.message);
    }
  };

  return (
    <>
      <div className="container">
        <div className="chatbot-popup">
          <div className="chat-header">
            <div className="header-info">
              <ChatbotIcon />
              <h2 className="logo-text">Chat-Bot</h2>
            </div>
            <button className="material-symbols-rounded">keyboard_arrow_down</button>
          </div>

          <div className="chat-body">
            <div className="message bot-message">
              <ChatbotIcon />
              <p className="message-text">
                Hey there 👋 <br />
                How can I help you
              </p>
            </div>

            {chatHistory.map((chat, index) => (
              <ChatMessage key={index} chat={chat} />
            ))}
          </div>

          <div className="chat-footer">
            <ChatForm
              chatHistory={chatHistory}
              setChatHistory={setChatHistory}
              generateBotResponse={generateBotResponse}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

