import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetails from './components/CourseDetails';
import './App.css';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';


class App extends Component {

  state = {
    userInfo: [],
    isAuthenticated: false
  }

  setAuthenticatedUser = (response) =>{
    this.setState({
      userInfo: response.data,
      isAuthenticated: true
    });
  }

  userSignOut = () => {
    this.setState({
      userInfo: [],
      isAuthenticated: false
    })
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route path='/' render={() => <Header user={this.state.userInfo} authentication={this.state.isAuthenticated}/>} />
          <Route exact path='/' component={Courses} />
          <Route exact path='/course-details/:id' component={CourseDetails} />
          <Route exact path='/sign-in' render={(history) => <UserSignIn setUser={this.setAuthenticatedUser} history={history}/>} />
          <Route exact path='/sign-out' rdner={() =><UserSignOut signOut={this.userSignOut}/>} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
