import React from "react";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import { Button } from "semantic-ui-react";

class DashboardPage extends React.Component {
  logout = () => {
    this.props.dispatch(logout());
  };
  render() {
    return (
      <div>
        <h1>THIS IS THE DASHBOARD</h1>
        <Button onClick={this.logout}>LOG OUT</Button>
      </div>
    );
  }
}

export default connect()(DashboardPage);
