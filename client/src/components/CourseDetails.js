import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Consumer } from './Context';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';


export default class CourseDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course: [],
      user: [],
      materials: null,
      description: '',
      time: null,
      deleted: false,
      notFound: false,
      unhandledError: false
    }
    this.getCourseData();
  }

  //gets course details from the api and sets state
  getCourseData = () => {
    axios.get(`http://localhost:5000/api/courses/${this.props.match.params.id}`)
      .then(res => {
        this.setState({
          course: res.data,
          user: res.data.user,
          description: res.data.description,
          materials: res.data.materialsNeeded,
          time: res.data.estimatedTime
        });

      })
      .catch(err => {
        if (err.response.status === 404) {
          this.setState({
            notFound: true
          });
        } else {
          this.setState({
            unhandledError: true
          })
        }
      });
  }

  //deletes course from database if the user has authorization
  deleteCourse = (auth) => {
    axios.delete(`http://localhost:5000/api/courses/${this.props.match.params.id}`, { headers: { 'Authorization': auth } })
      .then(() => this.setState({
        deleted: true
      }))
      .catch(err => {
        this.setState({
          unhandledError: true
        });
      });
  }

  render() {
    const courseData =
      <div>
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{this.state.course.title}</h3>
              <p>{`By ${this.state.user.firstName} ${this.state.user.lastName}`}</p>
            </div>
            <div className="course--description">
              <ReactMarkdown source={this.state.description} />
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">

                { //does not display Estimated time if the value is null
                  (this.state.time)
                    ? <li className="course--stats--list--item">
                      <h4>Estimated Time</h4>
                      <h3>{this.state.time}</h3>
                    </li>
                    : null
                }
                { //does not display Materials if the value is null
                  (this.state.materials)
                    ? <li className="course--stats--list--item">
                      <h4>Materials Needed</h4>
                      <ul>
                        <ReactMarkdown source={this.state.materials} />
                      </ul>
                    </li>
                    : null
                }
              </ul>
            </div>
          </div>
        </div>
      </div>;

    return (
      (this.state.unhandledError)//redirects to error path if the request to api returns an unhandled error
        ? <Redirect to="/error" />
        :
        (this.state.notFound) //redirects to notfound path if the course route does not exist
          ? <Redirect to='/notfound' />
          : (this.state.deleted) //redirects to courses page if the course has been deleted
            ? <Redirect to='/' />
            : <React.Fragment>
              <div className="actions--bar">
                <div className="bounds">
                  <div className="grid-100">
                    <Consumer>
                      {context => (
                        //checks if user is signed in, and owns the course else does not display update or delete buttons
                        (context.authenticated && context.authenticatedUserId === this.state.user._id)
                          ? <span>
                            <Link className="button" to={`/courses/${this.state.course._id}/update`}>Update Course</Link>
                            <button className="button" onClick={() => this.deleteCourse(context.auth)}>Delete Course</button>
                          </span>
                          : null
                      )}
                    </Consumer>
                    <Link className="button button-secondary" to="/">Return to List</Link>
                  </div>
                </div>
              </div>
              {courseData}
            </React.Fragment>
    )
  }
}

