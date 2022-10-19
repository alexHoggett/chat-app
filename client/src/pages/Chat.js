function Chat () {
  return (
    <div className="chat-page-container">

      <div className="users-container">
        Active Users
      </div>

      <div className="chat-container">
      <h1 className="page-heading">Chat</h1>

        <div className="messages-container">
          <Message
            username={"brian__em0"}
            time={"19:12pm"}
            messageByUser={false}
          >
            This is a message from someone else helloThis is a message from someone else helloThis is a message from someone else helloThis is a message from someone else helloThis is a message from someone else helloThis is a message from someone else helloThis is a message from someone else helloThis is a message from someone else helloThis is a message from someone else helloThis is a message from someone else helloThis is a message from someone else helloThis is a message from someone else helloThis is a message from someone else helloThis is a message from someone else helloThis is a message from someone else helloThis is a message from someone else helloThis is a message from someone else helloThis is a message from someone else helloThis is a message from someone else helloThis is a message from someone else hello
          </Message>

          <Message
            username={"brian__em0"}
            time={"19:12pm"}
            messageByUser={true}
          >
            This is a message from me
          </Message>
        </div>

        <ChatInput />
      </div>
    </div>
  )
}

function Message ({username, time, messageByUser, children}) {
  console.log(children);
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

function ChatInput () {
  return (
    <div className="chat-input-container">
      <input type="text" />
      <button>Send</button>
    </div>
  )
}

export default Chat;