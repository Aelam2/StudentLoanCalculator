import React from "react";
import { Route } from "react-router-dom";
import LayoutAuthorized from "components/LayoutAuthorized";
import LayoutUnAuthorized from "components/LayoutUnAuthorized";
import DashboardPage from "pages/DashboardPage";
import PaymentSchedulePage from "pages/PaymentSchedulePage";
import ResourcesPage from "pages/ResourcesPage";
import UserProfilePage from "pages/UserProfilePage";
import UserSignInPage from "pages/UserSignInPage";
import UserSignUpPage from "pages/UserSignUpPage";

import "./App.module.scss";

class App extends React.Component {
  render() {
    let { user, loading, error } = this.props;

    if (loading) {
    }

    if (error) {
    }

    if (user) {
      return (
        <LayoutAuthorized>
          <Route path="/" component={DashboardPage} />
          <Route path="/payment-schedule" component={PaymentSchedulePage} />
          <Route path="/resources" component={ResourcesPage} />
          <Route path="/user/profile" component={UserProfilePage} />
        </LayoutAuthorized>
      );
    }

    return (
      <LayoutUnAuthorized>
        <Route path="/user/sign-in" component={UserSignInPage} />
        <Route path="/user/sign-up" component={UserSignUpPage} />
      </LayoutUnAuthorized>
    );
  }
}

export default App;
