import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetails from './components/CourseDetails';
import './App.css';


class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route path='/' component={Header} />
          <Route exact path='/' component={Courses} />
          <Route exact path='/course-details/:id' component={CourseDetails} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
