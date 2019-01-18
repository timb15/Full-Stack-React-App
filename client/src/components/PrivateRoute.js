import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from './Context';

export const PrivateRoute = ({ Component }) => {
  return (
    <Consumer>
      {context => (
        <Route
          render={(props) =>
            (context.authenticated)
              ? <Component {...props} />
              : <Redirect to='/signin' />
          } />
      )}
    </Consumer>
  )
}
