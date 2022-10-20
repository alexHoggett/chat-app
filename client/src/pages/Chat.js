import { useState, useTransition, forwardRef, useRef} from 'react';

function Chat () {
  const [messages, addMessage] = useState([{
    username: 'alex',
    time: new Date(),
    message: 'This is my fist message yayyyy'
  }]);

  const [currentUser, updateUser] = useState('Alex');

  const [users, updateUsers] = useState(['Ben', 'Alex', 'Noor']);

  const [currentMessage, updateCurrentMessage] = useState('');

  const formRef = useRef(null);

  // console.log(messages);

  const sendMessage = (e) => {
    e.preventDefault();
    addMessage(prevMessages => {
      return [...prevMessages, {username: 'paul',
      time: new Date(),
      message: currentMessage}]
    });
    updateCurrentMessage('');
    // console.log(messages);
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
          <Message
            username={"brian__em0"}
            time={"19:12pm"}
            messageByUser={true}
          >
            This is a message from me
          </Message>
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
        <img src="paper-plane.svg" className='chat-input__icon'/>
      </button>
    </form>
)

export default Chat;