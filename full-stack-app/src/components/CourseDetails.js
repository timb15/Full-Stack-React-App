import React, {Component} from 'react';
import axios from 'axios';
import Course from './Course';

class CourseDetails extends Component {

    state ={
        course: [],
        user: [],
        materials: []
    }

    componentDidMount() {
        axios.get(`http://localhost:5000/api/courses/${this.props.match.params.id}`)
            .then(res => {
                if(res.data.materialsNeeded) {
                    this.setState({
                        course: res.data,
                        user: res.data.user,
                        materials: res.data.materialsNeeded.split('\n')
                    }); 
                }else {
                    this.setState({
                        course: res.data,
                        user: res.data.user,
                    }); 
                }
            })
            .catch(err => console.log('Error fething data', err));
    }

    render() {
        return(
            <Course course={this.state.course} user={this.state.user} materials={this.state.materials} />
        )
    }
}

export default CourseDetails;