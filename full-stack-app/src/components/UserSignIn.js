import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Consumer } from './Context';

class UserSignIn extends Component {


    render() {
        return (
            <Consumer>
                {context => {
                    return (
                        <div>
                            <div className="bounds">
                                <div className="grid-33 centered signin">
                                    <h1>Sign In</h1>
                                    <div>
                                        <form onSubmit={(e) => {
                                            e.preventDefault();
                                            //Checks users credentials against datbase and signs them in if there is a match
                                            context.actions.signIn(this.email.value, this.password.value);
                                            //redirects to the last page user was on before coming to the sign in page
                                            context.actions.lastPage(this.props.history);
                                        }
                                        }>
                                            <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" ref={(input) => this.email = input}></input></div>
                                            <div><input id="password" name="password" type="password" className="" placeholder="Password" ref={(input) => this.password = input}></input></div>
                                            <div className="grid-100 pad-bottom">
                                                <button className="button" type="submit">Sign In</button>
                                                <button className="button button-secondary" onClick={(e) => {
                                                    e.preventDefault();
                                                    context.actions.lastPage(this.props.history);
                                                }}>Cancel</button>
                                            </div>
                                        </form>
                                    </div>
                                    <p>&nbsp;</p>
                                    <p>Don't have a user account? <Link to="/sign-up">Click here</Link> to sign up!</p>
                                </div>
                            </div>
                        </div>
                    )
                }}
            </Consumer>

        )
    }

}

export default UserSignIn;