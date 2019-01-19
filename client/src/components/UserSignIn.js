import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Consumer } from './Context';


export default class UserSignIn extends Component {

  constructor(props) {
    super(props);
    this.state = {
      emailAddress: '',
      password: ''
    };
  }

  //function to update state when a form field is changed
  handleChange = (e, state) => {
    this.setState({
      [state]: e.target.value
    });
  }

  //creates an input field 
  generateFormInput = (inputName, type, placeholder) => {
    return (
      <div>
        <input id={inputName} name={inputName} type={type} className="" placeholder={placeholder}
          value={this.state.inputName} onChange={(e) => this.handleChange(e, inputName)} />
      </div>
    )
  }


  render() {
    const email = this.state.emailAddress;
    const pass = this.state.password;
    const history = this.props.history;
    return (
      (localStorage.getItem('authenticated'))
        ? <Redirect to="" />
        :
        <Consumer>
          {context =>
            <div className="bounds">
              <div className="grid-33 centered signin">
                <h1>Sign In</h1>
                <div>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    //Checks users credentials against datbase and signs them in if there is a match
                    context.actions.signIn(email, pass, history);
                  }
                  }>
                    {this.generateFormInput("emailAddress", "text", "Email Address")}
                    {this.generateFormInput("password", "password", "Password")}
                    <div className="grid-100 pad-bottom">
                      <button className="button" type="submit">Sign In</button>
                      <Link className="button button-secondary" to="/">Cancel</Link>
                    </div>
                  </form>
                </div>
                <p>&nbsp;</p>
                <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
              </div>
            </div>
          }
        </Consumer>
    )
  }
}

