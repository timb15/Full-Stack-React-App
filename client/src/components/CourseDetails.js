import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class CourseDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course: [],
      user: [],
      materials: [],
      description: []
    }
    this.getCourseData();
  }

  //gets course details from the api and sets state
  getCourseData = () => {
    axios.get(`http://localhost:5000/api/courses/${this.props.match.params.id}`)
      .then(res => {
        if (res.data.materialsNeeded) {
          this.setState({
            course: res.data,
            user: res.data.user,
            description: res.data.description.split('\n'),
            materials: res.data.materialsNeeded.split('\n')
          });
        } else {
          this.setState({
            course: res.data,
            user: res.data.user,
            description: res.data.description.split('\n')
          });
        }
      })
      .catch(err => console.log('Error fething data', err));
  }

  render() {
    //maps each material to a list item
    const mats = this.state.materials.map((mat, index) => <li key={index}>{mat}</li>)
    //Breaks discription into paragraphs
    const desc = this.state.description.map((paragraph, index) => <p key={index}>{paragraph}</p>)

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
              {desc}
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>{this.state.course.estimatedTime}</h3>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <ul>
                    {mats}
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

    return (
      <React.Fragment>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">
              <span>
                <Link className="button" to={`/courses/${this.state.course._id}/update`}>Update Course</Link>
                <Link className="button" to="/">Delete Course</Link>
              </span>
              <Link className="button button-secondary" to="/">Return to List</Link>
            </div>
          </div>
        </div>
        {courseData}
      </React.Fragment>
    )
  }
}

