import React from 'react';

const Course = ({courses, course, user, materials}) => {
    let courseData = [];

    if(courses) {
        courseData = courses.map(course => 
            <div className="bounds">
                <div className="grid-33" key={course._id}>
                    <a className="course--module course--link" href={`/course-details/${course._id}`}>
                        <h4 className="course--label">Course</h4>
                        <h3 className="course--title">{course.title}</h3>
                    </a>
                </div>
            </div>
        ); 
    } else if(course) {
        const mats = materials.map((mat, index) => <li key={index}>{mat}</li>)

        courseData = 
            <div>
                <div className="actions--bar">
                    <div className="bounds">
                        <div className="grid-100">
                            <span>
                                <a className="button" href={`/update-course/${course._id}`}>Update Course</a>
                                <a className="button" href="/">Delete Course</a>
                            </span>
                            <a className="button button-secondary" href="/">Return to List</a>
                        </div>
                    </div>
                </div>
                <div className="bounds course--detail">
                    <div className="grid-66">
                        <div className="course--header">
                            <h4 className="course--label">Course</h4>
                            <h3 className="course--title">{course.title}</h3>
                            <p>{`By ${user.firstName} ${user.lastName}`}</p>
                        </div>
                    <div className="course--description">
                        <p>{course.description}</p>
                    </div>
                </div>
                    <div className="grid-25 grid-right">
                        <div className="course--stats">
                            <ul className="course--stats--list">
                            <li className="course--stats--list--item">
                                <h4>Estimated Time</h4>
                                <h3>{course.estimatedTime}</h3>
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
    } 

    return(
        courseData
    )
}

export default Course;