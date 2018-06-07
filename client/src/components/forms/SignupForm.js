import React from "react";
import { Form, Button } from "semantic-ui-react";
import isEmail from "validator/lib/isEmail";
import axios from "axios";

class SignupForm extends React.Component {
  state = {
    data: {
      email: "",
      password: ""
    },
    loading: false,
    errors: {},
    success: false,
    msg: ""
  };

  onChange = e =>
    this.setState({
      ...this.state,
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  validate = data => {
    const errors = {};
    if (!isEmail(data.email)) errors.email = "Invalid email";
    if (!data.password) errors.password = "Can't be blank";

    return errors;
  };

  onSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      axios
        .post("users/register", this.state.data)
        .then(res => res.data)
        .then(data => {
          if (!data.success) {
            if (!!data.errors.global.email) {
              const errors = { ...this.state.errors };
              errors.email = data.errors.global.email;
              this.setState({ errors: errors, loading: false });
            } else if (!!data.errors.global.password) {
              const errors = { ...this.state.errors };
              errors.password = data.errors.global.password;
              this.setState({ errors: errors, loading: false });
            }
          } else if (data.success) {
            this.setState({
              success: data.success,
              msg: data.msg,
              loading: false
            });
            this.props.redirect();
          }
        });
    }
  };

  render() {
    const { data, errors, loading, success, msg } = this.state;

    return (
      <Form onChange={this.onChange} onSubmit={this.onSubmit} loading={loading}>
        <Form.Field error={!!errors.email} required>
          <label htmlFor="email">Adresse électronique</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Votre e-mail"
            value={data.email}
          />
          {!!errors.email && (
            <span style={{ color: "#ae5856" }}>{errors.email}</span>
          )}
        </Form.Field>

        <Form.Field error={!!errors.password} required>
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            name="password"
            value={data.password}
            placeholder="Votre Mot de Passe"
          />
          {!!errors.password && (
            <span style={{ color: "#ae5856" }}>{errors.password}</span>
          )}
        </Form.Field>

        <Button primary>Sign Up</Button>
        {success && <span style={{ color: "#00E640" }}>{msg}</span>}
      </Form>
    );
  }
}

export default SignupForm;
