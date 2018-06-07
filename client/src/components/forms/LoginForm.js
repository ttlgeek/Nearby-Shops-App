import React from "react";
import { Form, Button, Message } from "semantic-ui-react";
import Validator from "validator";
import axios from "axios";
import * as auth from "../../actions/auth";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class LoginForm extends React.Component {
  state = {
    data: {
      email: "",
      password: ""
    },
    loading: false,
    errors: {}
  };

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  validate = data => {
    const errors = {};
    if (!Validator.isEmail(data.email)) errors.email = "Invalid email";
    if (!data.password) errors.password = "Can't be blank";
    return errors;
  };

  onSubmit = () => {
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      axios
        .post("users/auth", this.state.data)
        .then(res => res.data)
        .then(data => {
          if (!data.success) {
            if (!!data.errors.password) {
              const errors = { ...this.state.errors };
              errors.password = data.errors.password;
              this.setState({ errors: errors, loading: false });
            } else if (!!data.errors.global) {
              const errors = { ...this.state.errors };
              errors.global = data.errors.global;
              this.setState({ errors: errors, loading: false });
            }
          } else if (data.success) {
            this.props.submit(data);
          }
        });
    }
  };

  render() {
    const { data, errors, loading } = this.state;

    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        {errors.global && (
          <Message negative>
            <Message.Header>Something went wrong!</Message.Header>
            <p>{errors.global}</p>
          </Message>
        )}
        <Form.Field error={!!errors.email}>
          <label htmlFor="email">Adresse électronique</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Votre Email"
            value={data.email}
            onChange={this.onChange}
          />
        </Form.Field>
        <Form.Field error={!!errors.password}>
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Votre Mot de Passe"
            value={data.password}
            onChange={this.onChange}
          />
        </Form.Field>
        <Button primary>Se Connecter</Button>
      </Form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(auth, dispatch);
}

export default connect(mapDispatchToProps)(LoginForm);
