import React, { Component } from 'react';
import axios from 'axios';


export default class UserSignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      emailAddress: '',
      password: '',
      confirmPassword: '',
      passwordMatch: true
    }
    this.handleChange = this.handleChange.bind(this);
  }

  //creates a new user with the form data
  createUser = () => {
    //confirms passwords entered by user match, displays error message if not
    if (this.state.password === this.state.confirmPassword) {
      const formData = {
        'firstName': this.state.firstName,
        'lastName': this.state.lastName,
        'emailAddress': this.state.emailAddress,
        'password': this.state.password,
      }
      axios.post('http://localhost:5000/api/users', formData)
        .then(res => console.log(res))
        .catch(err => {
          (err.response.status === 500)
            ? console.dir(err)
            : console.log(err)
        });
    } else {
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
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <div>
            <form onSubmit={(e) => {
              e.preventDefault();
              this.createUser();
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
                : <hr />
              }
              <div className="grid-100 pad-bottom">
                <button className="button" type="submit">Sign Up</button>
                <button className="button button-secondary">Cancel</button>
              </div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>Already have a user account? <a href="sign-in.html">Click here</a> to sign in!</p>
        </div>
      </div>
    )
  }
}

