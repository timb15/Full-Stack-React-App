import React from 'react';
import { Link } from 'react-router-dom';
import { Consumer } from './Context';

const Header = () => {
  return (
    <Consumer>
      {context => {
        return (
          (context.authenticated)
            ?
            <div className="header">
              <div className="bounds">
                <h1 className="header--logo">Courses</h1>
                <nav>
                  <span>Welcome {context.user.firstName} {context.user.lastName}</span>
                  <Link className="signout" to="/sign-out">Sign Out</Link>
                </nav>
              </div>
            </div>
            :
            <div className="header">
              <div className="bounds">
                <h1 className="header--logo">Courses</h1>
                <nav>
                  <Link className="signup" to="/sign-up">Sign Up</Link>
                  <Link className="signin" to="/sign-in">Sign In</Link>
                </nav>
              </div>
            </div>
        )
      }}
    </Consumer>
  );
}

export default Header;