import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Consumer } from './Context';
import axios from 'axios';


export default class CreateCourse extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: [],
      title: '',
      description: '',
      materials: '',
      time: '',
      created: false,
      validationErrors: null,
      unhandledError: false
    }
  }

  //creates a course from the form data and user credentials and sets validationError state if title or description are blank
  createCourse = (auth) => {
    const formData = {
      'title': this.state.title,
      'description': this.state.description,
      'materialsNeeded': this.state.materials,
      'estimatedTime': this.state.time
    }
    axios.post('http://localhost:5000/api/courses', formData, { headers: { 'Authorization': auth } })
      .then(() => {
        this.setState({
          created: true
        });
      })
      .catch(err => {
        if (err.response.status === 400) {
          this.setState({
            validationErrors: err.response.data.split(',')
          });
        } else {
          this.setState({
            unhandledError: true
          });
        }
      });
  }

  //updates state when a form field is changed
  handleChange = (e, state) => {
    this.setState({
      [state]: e.target.value
    });
  }


  render() {
    return (
      (this.state.unhandledError)//redirects to error path if the request to api returns an unhandled error
        ? <Redirect to="/error" />
        :
        <Consumer>
          {context => {
            const auth = context.auth;
            return (
              <div className="bounds course--detail">
                {
                  (this.state.created) //Redirects to courses home once a course has been created
                    ? <Redirect to='/' />
                    : null
                }
                <h1>Create Course</h1>
                <div>
                  {
                    (!this.state.validationErrors) //renders validation errors if there are any
                      ? null
                      :
                      <div>
                        <h2 className="validation--errors--label">Validation errors</h2>
                        <div className="validation-errors">
                          <ul>
                            {context.actions.validationErrors(this.state.validationErrors)}
                          </ul>
                        </div>
                      </div>
                  }
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
                      <Link className="button button-secondary" to="/">Cancel</Link>
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

