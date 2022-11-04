import { useState, forwardRef, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import { useLocation } from "react-router-dom";
const socket = io.connect("http://localhost:3001");

function Chat () {
  const [messages, addMessage] = useState([{
    username: "chatbot",
    time: new Date(),
    message: "Welcome to the chatroom 😈"
  }]);

  const location = useLocation();
  const [currentUser, updateUser] = useState(() => {
    const user = location.pathname.split('/chat/')[1];
    socket.emit("join_chat", {
      username: user
    })
    return user;
  });

  // To be made dynamic
  const [users, updateUsers] = useState(['Ben', 'Alex', 'Noor']);

  const [currentMessage, updateCurrentMessage] = useState('');

  const formRef = useRef(null);


  useEffect(() => {
    socket.on("receive_message", (data) => {
      addMessage(prevMessages => {
        return [...prevMessages, {
          username: data.username,
          time: new Date(),
          message: data.message
        }]
      })
    })
    return () => {
      socket.off("receive_message");
    }
  }, [socket])

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("send_message", {
      message: currentMessage,
      username: currentUser,
    });

    currentMessage !== '' &&
    addMessage(prevMessages => {
      return [...prevMessages, {username: currentUser,
      time: new Date(),
      message: currentMessage}]
    });
    updateCurrentMessage('');
  }

  const onEnter = (e) => {
    if(e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      formRef.current.requestSubmit()
    }
  }
  
  const setTypedText = (e) => updateCurrentMessage(e.target.value);

  return (
    <div className="chat-page-container">

      <div className="users__container">
        <h3 className="users__heading heading">Active Users</h3>
        <ul className="users__list">
          {users.map((user, index) => 
            <li
              key={index}
              className={user == currentUser ? 'current-user' : ''}
            >
              {user}
            </li>
          )}
        </ul>
      </div>

      <div className="chat-container">
      <h1 className="page-heading heading">Chat</h1>

        <div className="messages-container">
          {messages.map((message, index) =>
            <Message
              key={index}
              username={message.username}
              time={`${message.time.getHours()}:${message.time.getMinutes()}`}
              messageByUser={message.username == currentUser}
            >
            {message.message}
            </Message>

          )}
        </div>

        <ChatInput 
          onSubmit={sendMessage}
          value={currentMessage}
          onChange={setTypedText}
          onEnterPress={onEnter}
          ref={formRef}
        />

      </div>
    </div>
  )
}

const Message = ({username, time, messageByUser, children}) => {
  return (
    <div className={`message-wrapper ${messageByUser ? 'message--by-user' : ''}`}>
      <div className="message-container">
        <div className="message__user">{ username }</div>
        <div className="message__content">{ children }</div>
        <div className="message__time">{ time }</div>
      </div>
    </div>
  );
}

const ChatInput = forwardRef(({onSubmit, value, onChange, onEnterPress}, givenRef) =>
    <form onSubmit={onSubmit} className="chat-input__container" ref={givenRef}>
      <textarea
        type='textarea'
        name='textarea'
        value={value}
        onChange={onChange}
        className='chat-input__text'
        onKeyDown={onEnterPress}
      />
      <button
        className='chat-input__button'
        type='submit'
      >
        <img src="/paper-plane.svg" className='chat-input__icon'/>
      </button>
    </form>
)

export default Chat;