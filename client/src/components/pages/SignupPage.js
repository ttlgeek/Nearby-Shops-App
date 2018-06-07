import React from "react";
import SignupForm from "../forms/SignupForm";
import { withRouter } from "react-router-dom";

class SignupPage extends React.Component {
  render() {
    return (
      <div>
        <h1>Inscrivez-vous!</h1>
        <SignupForm test={this.redirect} />
      </div>
    );
  }
}

const SignupPageWithRouter = withRouter(SignupPage);

export default SignupPageWithRouter;
