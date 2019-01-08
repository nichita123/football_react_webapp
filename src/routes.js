import React from "react";
import Layout from "./Hoc/Layout";

import { Switch } from "react-router-dom";

import Home from "./components/home";
import SignIn from "./components/sign_in";
import Dashboard from "./components/admin/Dashboard";
import AdminMatches from "./components/admin/matches";
import AddEditMatch from "./components/admin/matches/AddEditMatch";
import AdminPlayers from "./components/admin/players";
import AddEditPlayer from "./components/admin/players/AddEditPlayer";

import Team from "./components/team";
import Matches from "./components/matches";

import PrivateRoute from "./components/auth_routes/PrivateRoutes";
import PublicRoute from "./components/auth_routes/PublicRoutes";

const Routes = props => {
  return (
    <Layout>
      <Switch>
        <PublicRoute
          {...props}
          exact
          restricted={false}
          path="/"
          component={Home}
        />

        <PublicRoute
          {...props}
          exact
          restricted={false}
          path="/matches"
          component={Matches}
        />

        <PublicRoute
          {...props}
          exact
          restricted={false}
          path="/team"
          component={Team}
        />

        <PublicRoute
          {...props}
          restricted={true}
          exact
          path="/signin"
          component={SignIn}
        />
        <PrivateRoute {...props} exact path="/admin" component={Dashboard} />
        <PrivateRoute
          {...props}
          exact
          path="/admin/matches"
          component={AdminMatches}
        />
        <PrivateRoute
          {...props}
          exact
          path="/admin/matches/edit"
          component={AddEditMatch}
          //add match component
        />
        <PrivateRoute
          {...props}
          exact
          path="/admin/matches/edit/:id"
          component={AddEditMatch}
          //edit match component
        />
        <PrivateRoute
          {...props}
          exact
          path="/admin/players"
          component={AdminPlayers}
        />
        <PrivateRoute
          {...props}
          exact
          path="/admin/players/edit"
          component={AddEditPlayer}
          //add player component
        />
        <PrivateRoute
          {...props}
          exact
          path="/admin/players/edit/:id"
          component={AddEditPlayer}
          //edit player component
        />
      </Switch>
    </Layout>
  );
};

export default Routes;
