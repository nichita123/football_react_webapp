import React from "react";
import Layout from "./Hoc/Layout";

import { Switch } from "react-router-dom";

import Home from "./components/home";
import SignIn from "./components/sign_in";
import Dashboard from "./components/admin/Dashboard";
import AdminMatches from './components/admin/matches';
import AddEditMatch from './components/admin/matches/AddEditMatch';

import PrivateRoute from "./components/auth_routes/PrivateRoutes";
import PublicRoute from "./components/auth_routes/PublicRoutes";

const Routes = props => {
  return (
    <Layout>
      <Switch>
        <PrivateRoute
          {...props}
          exact
          path="/admin_matches/edit"
          component={AddEditMatch}
        />
        <PrivateRoute
          {...props}
          exact
          path="/admin_matches/edit/:id"
          component={AddEditMatch}
        />
        <PrivateRoute
          {...props}
          exact
          path="/admin_matches"
          component={AdminMatches}
        />
        <PrivateRoute
          {...props}
          exact
          path="/dashboard"
          component={Dashboard}
        />
        <PublicRoute 
          {...props}
          restricted={true}
          exact 
          path="/sign_in"  
          component={SignIn} 
        />
        <PublicRoute 
          {...props}
          exact
          restricted={false}
          path="/"  
          component={Home} 
        />
      </Switch>
    </Layout>
  );
};

export default Routes;
