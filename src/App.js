import React from 'react';  
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './user/pages/Auth';
import MainNavigation from './shared/coponents/Navigation/MainNavigation';
import {AuthContext} from './shared/context/auth-context';
import {useAuth} from './shared/hooks/auth-hook';


const App = () => {
  const {token, login, logout, userId} = useAuth();

  let routes;

  if(token){
    routes = (
      <Switch>
        <React.Fragment>
          <Route path="/" exact >
            <Users />
          </Route>
          <Route path="/:userId/places" exact>
            <UserPlaces />
          </Route>
          <Route path="/place/new" exact >
            <NewPlace />
          </Route>
          <Route path="/places/:placeId" >
            <UpdatePlace />
          </Route>
          <Route path="/auth">
            <Auth />
          </Route>
          <Redirect to="/" />
        </React.Fragment>
      </Switch>
    );
  }else{
    routes = (
      <Switch>
        <React.Fragment>
          <Route path="/" exact >
            <Users />
          </Route>
          <Route path="/:userId/places" exact>
            <UserPlaces />
          </Route>
          <Route path="/auth">
            <Auth />
          </Route>
          <Redirect to="/auth" />
        </React.Fragment>
      </Switch>
    );
  }

  return (
    <AuthContext.Provider value={{isLoggedIn: !!token, token, userId, login, logout}}>
      <Router>
        <main>
          <MainNavigation />
          <Switch>
            {routes}
          </Switch>
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;