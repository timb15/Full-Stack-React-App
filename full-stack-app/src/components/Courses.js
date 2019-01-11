import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


class Courses extends Component {

    state = {
        allCourses: []
    }

    //sets state with data from api
    componentWillMount() {
        axios.get('http://localhost:5000/api/courses')
            .then(res => {
                this.setState({
                    allCourses: res.data
                });
            })
            .catch(err => console.log('Error fetching data', err));
    }

    render() {
        //creates each course element from the api data
        const courseData = this.state.allCourses.map(course =>
            <div className="grid-33" key={course._id}>
                <Link className="course--module course--link" to={`/courses/${course._id}`}>
                    <h4 className="course--label">Course</h4>
                    <h3 className="course--title">{course.title}</h3>
                </Link>
            </div>)

        //renders the courses to the page
        return (
            <div className="bounds">
                {courseData}
                <div className="grid-33">
                    <Link className="course--module course--add--module" to="/create-course">
                        <h3 className="course--add--title">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" className="add">
                                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                            </svg>New Course
                        </h3>
                    </Link>
                </div>
            </div>
        )
    }
}

export default Courses;