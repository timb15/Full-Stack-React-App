import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Consumer } from './components/Context';
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetails from './components/CourseDetails';
import UpdateCourse from './components/UpdateCourse';
import './App.css';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import UserSignUp from './components/UserSignUp';
import CreateCourse from './components/CreateCourse';


class App extends Component {


  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path='/' component={Courses} />
            <Route exact path='/courses/:id' component={CourseDetails} />
            <Route exact path='/courses/:id/update' component={UpdateCourse} />
            <Route exact path='/sign-in' render={(history) => <UserSignIn history={history} />} />
            <Route exact path='/sign-up' component={UserSignUp} />
            <Route exact path='/create-course' component={CreateCourse} />
            <Consumer>
              {context => {
                return (
                  <Route exact path='/sign-out' render={() => <UserSignOut signOut={context.actions.signOut} />} />
                )
              }}
            </Consumer>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
