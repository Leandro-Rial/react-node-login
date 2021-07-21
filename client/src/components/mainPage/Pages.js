import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import { GlobalState } from '../../GlobalState';
import Register from './Login/Register';
import Login from './Login/Login';
import Home from './home/Home';
import NotFound from './Utils/NotFound';

const Pages = () => {

    const state = useContext(GlobalState);
    const [isLogged] = state.userAPI.isLogged;

    return (
        <Switch>
            <Route exact path="/" component={ isLogged ? Home : Login } />

            <Route path="/register" component={ isLogged ? NotFound : Register } />
            <Route path="/login" component={ isLogged ? NotFound : Login } />

            <Route path="*" component={NotFound} />
        </Switch>
    )
}

export default Pages
