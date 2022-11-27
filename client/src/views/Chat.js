import { useState, forwardRef, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import { useParams, useLocation, useNavigate } from "react-router-dom";

const socket = io.connect("http://localhost:3001");

function Chat () {
  const location = useLocation();
  const navigate = useNavigate();

  if (!location.state || location.state.from !== 'JOIN_PAGE') {
    navigate('/');
  }
  let { name, room } = useParams();
  
  
  const [messages, addMessage] = useState([{
    username: "chatbot",
    time: new Date(),
    message: "Welcome to the chatroom 😈"
  }]);
  const [currentUser, updateUser] = useState(name);
  const [currentRoom, updateCurrentroom] = useState(room);
  const [users, updateUsers] = useState([]);
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
    });

    
    socket.emit("join_room", {username: currentUser, room: room}, (err) => {
      if (err){
        console.log(err);
      }
    });
    
    socket.on("update_users", (users) => {
      console.log('recieved updated user list')
      updateUsers(users);
    })

    return () => {
      socket.off("receive_message");
      socket.emit("leave_room", {username: currentUser, room: room});
    }
  }, [socket])

  const sendMessage = (e) => {
    e.preventDefault();

    currentMessage != '' &&
    socket.emit("send_message", {
      message: currentMessage,
      room: currentRoom,
      username: currentUser,
    });
    updateCurrentMessage('');
  }

  const onEnter = (e) => {
    if(e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      formRef.current.requestSubmit()
    }
  }

  const leaveRoom = () => {
    navigate('/');
    socket.emit('leave_room', room);
  }
  
  const setTypedText = (e) => updateCurrentMessage(e.target.value);

  return (
    <div className="chat-page-container">

      <div className="users__container">
        <h3 className="users__heading">Active Users</h3>
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
        <h1 className="chat-heading">
          {room}
          <img 
          src="/leave.svg"
          className="leave-icon"
          onClick={ leaveRoom }
        />
        </h1>
        <div className="messages-container">
          {messages.map((message, index) =>
            <Message
              key={index}
              username={message.username}
              time={`${message.time.getHours()}:${(message.time.getMinutes() < 10 ? '0':'') + message.time.getMinutes()}`}
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