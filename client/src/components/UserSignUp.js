import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
      otherError: null
    }
    this.handleChange = this.handleChange.bind(this);
  }

  //creates a new user with the form data
  createUser = (callback) => {
    //confirms passwords entered by user match, displays error message if not
    if (this.state.password === this.state.confirmPassword) {
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
          console.dir(err);
          if (err.response.status === 400) {
            this.setState({
              validationErrors: err.response.data.split(',')
            });
          } else if (err.response.status === 500) {
            this.setState({
              validationErrors: [],
              otherError: err.response.data.message
            })
          }
        });
    } else {
      //if passwords do not match set passwordMatch to false
      this.setState({
        passwordMatch: false
      });
    }
  }

  handleChange(e, state) {
    this.setState({
      [state]: e.target.value
    });
  }

  render() {
    return (
      <Consumer>
        {context =>
          <div className="bounds">
            <div className="grid-33 centered signin">
              <h1>Sign Up</h1>
              {
                (this.state.validationErrors) //renders validation errors if there are any
                  ? <div>
                    <h2 className="validation--errors--label">Validation errors</h2>
                    <div className="validation-errors">
                      <ul>
                        {
                          this.state.validationErrors.map((error) => {
                            if (error.includes('firstName')) {
                              return <li key={error}>Please enter a first name!</li>
                            }
                            if (error.includes('lastName')) {
                              return <li key={error}>Please enter a last name!</li>
                            }
                            if (error.includes('emailAddress')) {
                              return <li key={error}>Please enter a valid email address!</li>
                            }
                            if (error.includes('password')) {
                              return <li key={error}>Please enter a password!</li>
                            }
                            return null
                          })
                        }
                        {
                          (this.state.otherError)
                            ? <li key='otherError'>{this.state.otherError}</li>
                            : null
                        }
                      </ul>
                    </div>
                  </div>
                  : null
              }
              <div>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  //creates user and passes the signin fuction as a callback to sign in the user after creation
                  this.createUser(context.actions.signIn);
                }}>
                  <div>
                    <input id="firstName" name="firstName" type="text" className="" placeholder="First Name"
                      value={this.state.firstName} onChange={(e) => this.handleChange(e, 'firstName')} />
                  </div>
                  <div>
                    <input id="lastName" name="lastName" type="text" className="" placeholder="Last Name"
                      value={this.state.lastName} onChange={(e) => this.handleChange(e, 'lastName')} />
                  </div>
                  <div>
                    <input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address"
                      value={this.state.emailAddress} onChange={(e) => this.handleChange(e, 'emailAddress')} />
                  </div>
                  <div>
                    <input id="password" name="password" type="password" className="" placeholder="Password"
                      value={this.state.password} onChange={(e) => this.handleChange(e, 'password')} />
                  </div>
                  <div>
                    <input id="confirmPassword" name="confirmPassword" type="password" className="" placeholder="Confirm Password"
                      value={this.state.confirmPassword} onChange={(e) => this.handleChange(e, 'confirmPassword')} />
                  </div>
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

