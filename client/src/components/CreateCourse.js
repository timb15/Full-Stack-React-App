import React, { Component } from 'react';
import { Consumer } from './Context';
import { Redirect } from 'react-router-dom';
import axios from 'axios';


export default class CreateCourse extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: [],
      title: '',
      description: '',
      materials: '',
      time: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  //creates a course from the form data and user credentials
  createCourse(auth) {
    const formData = {
      'title': this.state.title,
      'description': this.state.description,
      'materialsNeeded': this.state.materials,
      'estimatedTime': this.state.time
    }
    axios.post('http://localhost:5000/api/courses', formData, { headers: { 'Authorization': auth } })
      .then(res => console.log(res))
      .catch(err => {
        (err.response.status === 500)
          ? console.dir(err)
          : console.log(err)
      });
  }

  //updates state when a form field is changed
  handleChange(e, state) {
    this.setState({
      [state]: e.target.value
    });
  }

  render() {
    return (
      <Consumer>
        {context => {
          if (!context.authenticated) {
            return <Redirect to='/sign-in' />
          }
          const auth = context.auth;
          return (
            <div className="bounds course--detail">
              <h1>Create Course</h1>
              <div>
                <div>
                  <h2 className="validation--errors--label">Validation errors</h2>
                  <div className="validation-errors">
                    <ul>
                      <li>Please provide a value for "Title"</li>
                      <li>Please provide a value for "Description"</li>
                    </ul>
                  </div>
                </div>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  this.createCourse(auth);
                }}>
                  <div className="grid-66">
                    <div className="course--header">
                      <h4 className="course--label">Course</h4>
                      <div>
                        <input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..."
                          value={this.state.title} onChange={(e) => this.handleChange(e, 'title')} />
                      </div>
                      <p>By Joe Smith</p>
                    </div>
                    <div className="course--description">
                      <div>
                        <textarea id="description" name="description" className="" placeholder="Course description..."
                          value={this.state.description} onChange={(e) => this.handleChange(e, 'description')} />
                      </div>
                    </div>
                  </div>
                  <div className="grid-25 grid-right">
                    <div className="course--stats">
                      <ul className="course--stats--list">
                        <li className="course--stats--list--item">
                          <h4>Estimated Time</h4>
                          <div>
                            <input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input"
                              placeholder="Hours" value={this.state.time} onChange={(e) => this.handleChange(e, 'time')} />
                          </div>
                        </li>
                        <li className="course--stats--list--item">
                          <h4>Materials Needed</h4>
                          <div>
                            <textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..."
                              value={this.state.materials} onChange={(e) => this.handleChange(e, 'materials')} />
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="grid-100 pad-bottom">
                    <button className="button" type="submit">Create Course</button>
                    <button className="button button-secondary" >Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          )
        }
        }
      </Consumer>
    )
  }
}

