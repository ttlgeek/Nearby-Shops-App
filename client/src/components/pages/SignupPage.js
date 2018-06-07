import React from "react";
import SignupForm from "../forms/SignupForm";
import { withRouter } from "react-router-dom";

class SignupPage extends React.Component {
  redirect = () => this.props.history.push("/login");
  render() {
    return (
      <div>
        <h1>Inscrivez-vous!</h1>
        <SignupForm test={this.test} />
      </div>
    );
  }
}

const SignupPageWithRouter = withRouter(SignupPage);

export default SignupPageWithRouter;
