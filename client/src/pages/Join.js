function Join () {

  return (
    <div className="join-container">
      <h1 className="heading">
        <span className="title title--small">a</span><span className="title title--large">fully working</span><span className="title title--medium"> chat room</span>
      </h1>
      <div className="login-container">
        <JoinForm
          // value={'username'}
          onSubmit={() => {}}
        >
          Choose Username:
        </JoinForm>
      </div>

    </div>
  )
}

const JoinForm = ({value, onSubmit, children}) => {

  return (
    <form 
      action="/chat"
      onSubmit = { onSubmit }
      className = { 'center' }
    >
      <label htmlFor='name'>{ children }</label>
      <input
        type="text"
        id="name"
        name="name"
        className = {'login-text'}
        value = { value }
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