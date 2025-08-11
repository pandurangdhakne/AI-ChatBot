import React, { useRef } from 'react';

const ChatForm = ({chatHistory , setChatHistory , generateBotResponse}) =>{



    const inputRef = useRef();

    const handleFormSubmit = (event) => {
  event.preventDefault();

  const userMessage = inputRef.current.value.trim();
  if (!userMessage) return;

  inputRef.current.value = "";

  // Create updated history first
  const updatedHistory = [...chatHistory, { role: "user", text: userMessage }];

  // Update chat history with user message
  setChatHistory(updatedHistory);

  // Delay for bot typing indicator
  setTimeout(() => {
    // Show "Thinking..." placeholder
    setChatHistory((prev) => [...prev, { role: "model", text: "Thinking ..." }]);

    // Call bot with updated history (includes user message)
    generateBotResponse(updatedHistory);
  }, 600);
};



return(

<>

<form action="#" className='chat-form' onSubmit={handleFormSubmit}>

                   <input ref={inputRef} type='text' placeholder='Message...' 
                    className='message-input' required />
                    
                      <button class="material-symbols-rounded"> arrow_upward </button>

</form>

</>

)

}

export {ChatForm}