import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Join () {

  const [username, updateUsername] = useState(null);
  const navigate = useNavigate();

  const joinChat = () => {
    if (username) {
      navigate(`/chat/${username}`);
    }
  }

  const usernameChanged = (e) => updateUsername(e.target.value);

  return (
    <div className="join-container">
      <h1 className="heading">
        <span className="title title--small">a</span><span className="title title--large">fully working</span><span className="title title--medium"> chat room</span>
      </h1>
      <div className="login__container">
        <JoinForm
          // value={'username'}
          onSubmit={ joinChat }
          onChange={ usernameChanged }
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
      onChange = { onChange }
      value = { value }
    >
      <label htmlFor='name' className="login__label">{ children }</label>
      <input
        type="text"
        id="name"
        name="name"
        className = {'login__text'}
        // value = { value }
      />
      
      <JoinButton
        onClick={() => {}}
        type={"submit"}
        className={'button button--login'}
        dataText={'Join'}
      >
        Join
      </JoinButton>
    </form>
  );
}


const Button = ({onClick, className='', children}) =>
  <button
    onClick = {onClick}
    className = {className}
  >
    {children}
  </button>



const JoinButton = ({onClick, type, className='', dataText, children}) =>
  <button
    onClick = {onClick}
    type = {type}
    className = {className}
    data-text = {dataText}
  >
    <span>{children}</span>
  </button>



const JoinText = ({}) =>
  <input></input>

export default Join;