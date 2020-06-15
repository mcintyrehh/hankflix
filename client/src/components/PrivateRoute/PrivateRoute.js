import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { RootContext } from '../../utils/RootContext';

const AuthenticatedRoute = ({component: Component, ...rest}) => {
    const { authenticated } = useContext(RootContext)

    return (
        // Show the component only when the user is authenticated
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            authenticated ?
                <Component {...props} />
            : <Redirect to="/signin" />
        )} />
    );
};

export default AuthenticatedRoute;