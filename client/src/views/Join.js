import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Join () {
  const [username, updateUsername] = useState(null);
  const [room, updateRoom] = useState('room1');
  const navigate = useNavigate();

  const joinChat = () => {
    if (username) {
      navigate(`/chat/${room}/${username}`, {state: {from: 'JOIN_PAGE'}});
    }
  }

  const formChange = (e) => {
    switch (e.target.name){
      case 'username':
        updateUsername(e.target.value);
        break;
      case 'room':
        console.log(e.target.value)
        updateRoom(e.target.value);
        break;
    }
  };

  return (
    <div className="join-container">
      <h1 className="heading">
        <span className="title title--small">a</span><span className="title title--large">fully working</span><span className="title title--medium"> chat room</span>
      </h1>
      <div className="login__container">
        <JoinForm
          // value={'username'}
          onSubmit={ joinChat }
          onChange={ formChange }
          value={ username }
        >
          Username
        </JoinForm>
      </div>

    </div>
  )
}

const JoinForm = ({onSubmit, onChange, value, children, }) => {
  return (
    <form 
      onSubmit = { onSubmit }
      className = { 'login__form' }
      value = { value }
      onChange = {onChange}
    >
      <label htmlFor='name' className="login__label">{ children }</label>
      <input
        type="text"
        id="username"
        name="username"
        className = {'login__text'}
      />
      <select
        id="room"
        name="room"
        className={'login__room'}
        defaultValue={'room1'}
      >
        <option value="room1">room1</option>
        <option value="room2">room2</option>
      </select>
      
      <JoinButton
        type={"submit"}
        className={'button button--login'}
        dataText={'Join'}
      >
        Join
      </JoinButton>
    </form>
  );
}

const JoinButton = ({onClick, type, className='', dataText, children}) =>
  <button
    onClick = {onClick}
    type = {type}
    className = {className}
    data-text = {dataText}
  >
    <span>{children}</span>
  </button>

export default Join;