import React, { Component } from 'react';
import axios from 'axios';
import Course from './Course';


class Courses extends Component {

    state = {
        allCourses: []
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/courses')
            .then(res => {
                this.setState({
                    allCourses: res.data
                });
            })
            .catch(err => console.log('Error fetching data', err));
    }


    render() {
        return( 
            <div className="bounds">
                <Course courses={this.state.allCourses} />
                <div className="grid-33">
                    <a className="course--module course--add--module" href="/create-course">
                        <h3 className="course--add--title">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"viewBox="0 0 13 13" className="add">
                                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                            </svg>New Course
                        </h3>
                    </a>
                </div>
            </div>
        )
    }
}

export default Courses;