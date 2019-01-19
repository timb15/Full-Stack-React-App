import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetails from './components/CourseDetails';
import UpdateCourse from './components/UpdateCourse';
import './App.css';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import UserSignUp from './components/UserSignUp';
import CreateCourse from './components/CreateCourse';
import { PrivateRoute } from './components/PrivateRoute';
import { NotFound } from './components/NotFound';
import { Consumer } from './components/Context';
import { Forbidden } from './components/Forbidden';
import { UnhandledError } from './components/Error';


class App extends Component {


  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Consumer>{context =>
            <Switch>
              <Route exact path='/' component={Courses} />
              <Route exact path='/courses/:id' component={CourseDetails} />
              <Route exact path='/courses/:id/update' render={() => <PrivateRoute Component={UpdateCourse} />} />
              <Route exact path='/signin' render={(history) => <UserSignIn history={history} />} />
              <Route exact path='/signup' render={(history) => <UserSignUp history={history} />} />
              <Route exact path='/create' render={() => <PrivateRoute Component={CreateCourse} />} />
              <Route exact path='/signout' render={() => <UserSignOut signOut={context.actions.signOut} />} />
              <Route exact path='/error' component={UnhandledError} />
              <Route exact path='/forbidden' component={Forbidden} />
              <Route exact path='/notfound' component={NotFound} />
              <Route component={NotFound} />
            </Switch>
          }
          </Consumer>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
