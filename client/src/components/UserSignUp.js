import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Consumer } from './Context';
import axios from 'axios';


export default class UserSignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      signIn: null,
      firstName: '',
      lastName: '',
      emailAddress: '',
      password: '',
      confirmPassword: '',
      passwordMatch: true,
      validationErrors: null,
      emailInUse: null
    }
  }

  //creates a new user with the form data, accepts callback to sign in user after creation
  createUser = (callback) => {
    //confirms passwords entered by user match, displays error message if not
    if (this.state.password !== this.state.confirmPassword) {
      //if passwords do not match set passwordMatch to false
      this.setState({
        validationErrors: null,
        passwordMatch: false
      });
    } else {
      const formData = {
        'firstName': this.state.firstName,
        'lastName': this.state.lastName,
        'emailAddress': this.state.emailAddress,
        'password': this.state.password,
      }
      axios.post('http://localhost:5000/api/users', formData)
        .then(() => {
          //signs in user after they have been created in the database
          callback(this.state.emailAddress, this.state.password, this.props.history);
        })
        //sets validation error states if there are any
        .catch(err => {
          if (err.response.status === 400) {
            this.setState({
              validationErrors: err.response.data.split(',')
            });
          }
          if (err.response.status === 409) {
            this.setState({
              validationErrors: [],
              emailInUse: err.response.data.message
            });
          }
        });
    }
  }

  //function to set state if a form field is changed
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
    return (
      (localStorage.getItem('authenticated')) //redirects user to home page if they are already signed in
        ? <Redirect to="/" />
        :
        <Consumer>
          {context =>
            <div className="bounds">
              <div className="grid-33 centered signin">
                <h1>Sign Up</h1>
                {
                  (!this.state.validationErrors) //renders validation errors if there are any
                    ? null
                    : <div>
                      <h2 className="validation--errors--label">Validation errors</h2>
                      <div className="validation-errors">
                        <ul>
                          {context.actions.validationErrors(this.state.validationErrors)}
                          {
                            (this.state.emailInUse)
                              ? <li key="emailInUse">{this.state.emailInUse}</li>
                              : null
                          }
                        </ul>
                      </div>
                    </div>
                }
                <div>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    this.createUser(context.actions.signIn);
                  }}>
                    {this.generateFormInput("firstName", "text", "First Name")}
                    {this.generateFormInput("lastName", "text", "Last Name")}
                    {this.generateFormInput("emailAddress", "text", "Email Address")}
                    {this.generateFormInput("password", "password", "Password")}
                    {this.generateFormInput("confirmPassword", "password", "Confirm Password")}
                    {(!this.state.passwordMatch)
                      ? <div><p>Passwords do not match!</p></div>
                      : null
                    }
                    <div className="grid-100 pad-bottom">
                      <button className="button" type="submit">Sign Up</button>
                      <Link className="button button-secondary" to="/">Cancel</Link>
                    </div>
                  </form>
                </div>
                <p>&nbsp;</p>
                <p>Already have a user account? <Link to="/signin">Click here</Link> to sign in!</p>
              </div>
            </div>
          }
        </Consumer>
    )
  }
}

