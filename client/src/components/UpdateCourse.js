import React, { Component } from 'react';
import axios from 'axios';
import { Consumer } from './Context';
import { Redirect } from 'react-router-dom';



export default class UpdateCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      title: '',
      description: '',
      materials: '',
      time: ''
    }
    this.getCourseData();
    this.handleChange = this.handleChange.bind(this);
  }

  //gets course data from the api and sets state
  getCourseData = () => {
    axios.get(`http://localhost:5000/api/courses/${this.props.match.params.id}`)
      .then(res => {
        this.setState({
          user: res.data.user,
          title: res.data.title,
          description: res.data.description,
          materials: res.data.materialsNeeded,
          time: res.data.estimatedTime
        })
      })
      .catch(err => console.log('Error fething data', err));
  }

  //updates course details when the form is submitted
  updateCourse(auth) {
    const formData = {
      'title': this.state.title,
      'description': this.state.description,
      'materialsNeeded': this.state.materials,
      'estimatedTime': this.state.time
    }
    axios.put(`http://localhost:5000/api/courses/${this.props.match.params.id}`, formData, { headers: { 'Authorization': auth } })
      .then(res => console.log(res))
      .catch(err => {
        (err.response.status === 500)
          ? console.dir(err)
          : console.log(err)
      });
  }

  //sets state when any for field is changed
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
            <div>
              <div className="bounds course--detail">
                <h1>Update Course</h1>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  this.updateCourse(auth);
                }}>
                  <div className="grid-66">
                    <div className="course--header">
                      <h4 className="course--label">Course</h4>
                      <div>
                        <input id="title" name="title" type="text" className="input-title course--title--input"
                          placeholder="Course Title" value={this.state.title} onChange={(e) => this.handleChange(e, 'title')} />
                      </div>
                      <p>author</p>
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
                          <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input"
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
                    <button className="button" type="submit">Update Course</button>
                    <button className="button button-secondary" >Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          )
        }}
      </Consumer>)
  }
}
