import React from "react";
import LoginForm from "../forms/LoginForm";
import { connect } from "react-redux";
import { login } from "../../actions/auth";

class LoginPage extends React.Component {
  submit = data => {
    this.props.dispatch(login(data));
  };

  render() {
    return (
      <div>
        <h1>Se Connecter!</h1>
        <LoginForm submit={this.submit} />
      </div>
    );
  }
}

export default connect()(LoginPage);
