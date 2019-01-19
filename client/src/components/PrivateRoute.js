import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from './Context';

export const PrivateRoute = ({ Component }) => {
  return (
    <Consumer>
      {context => (
        <Route
          render={(props) =>
            //redirects user to sign in page if they are not signed in and trying to visit a private route
            (context.authenticated)
              ? <Component {...props} />
              : <Redirect to='/signin' />
          } />
      )}
    </Consumer>
  )
}
