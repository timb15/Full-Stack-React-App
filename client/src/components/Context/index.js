import React, { Component } from 'react';
import axios from 'axios';
const AppContext = React.createContext();

export class Provider extends Component {

  state = {
    firstName: localStorage.getItem('first'),
    lastName: localStorage.getItem('last'),
    id: localStorage.getItem('id'),
    isAuthenticated: localStorage.getItem('authenticated'),
    auth: localStorage.getItem('auth')
  }

  /*signs a user in with email and password, uses history to redirect user back to the page they were
  on before signing in*/
  signIn = (email, password, history) => {
    const credentials = `${email}:${password}`;
    //creates a base64 encoded string to pass with the basic Auth header
    const auth = 'Basic ' + new Buffer(credentials).toString('base64');
    //get request with users credntials, saves user info to state 
    axios.get('http://localhost:5000/api/users', { headers: { 'Authorization': auth } })
      .then(res => {
        this.setState({
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          id: res.data._id,
          isAuthenticated: true,
          auth: auth
        });
        //adds user data to local storage to persist when user refreshes or closes browser
        localStorage.setItem('first', res.data.firstName);
        localStorage.setItem('last', res.data.lastName);
        localStorage.setItem('id', res.data._id);
        localStorage.setItem('authenticated', true);
        localStorage.setItem('auth', auth);
        //returns to page user was on before signing in
        this.lastPage(history);
      })
      .catch(err => console.log('Error fetching data!', err));
  }

  //signs the user out by clearing the localStorage and resetting the user state
  signOut = () => {
    localStorage.clear();
    this.setState({
      firstName: localStorage.getItem('first'),
      lastName: localStorage.getItem('last'),
      id: localStorage.getItem('id'),
      isAuthenticated: localStorage.getItem('authenticated'),
      auth: localStorage.getItem('auth')
    });
  }

  //redirects to the last page user was on
  lastPage = (history) => {
    history.history.goBack();
  }

  //creates validation errors
  generateValidationErrors = (errors) => {
    return (
      errors.map((error) => {
        if (error.includes('title')) {
          return <li key={error}>Please enter a title!</li>
        }
        if (error.includes('description')) {
          return <li key={error}>Please enter a description!</li>
        }
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
    )
  }

  render() {
    return (
      //sets states and functions that will be availble to components via Consumer
      <AppContext.Provider value={{
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        authenticatedUserId: this.state.id,
        authenticated: this.state.isAuthenticated,
        auth: this.state.auth,
        actions: {
          signIn: this.signIn,
          signOut: this.signOut,
          lastPage: this.lastPage,
          validationErrors: this.generateValidationErrors
        }
      }}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export const Consumer = AppContext.Consumer;