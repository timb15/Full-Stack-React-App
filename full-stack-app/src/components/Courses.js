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
                <Course courses={this.state.allCourses} />
        )
    }
}

export default Courses;