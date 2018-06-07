import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Menu, Button, Segment } from "semantic-ui-react";
import { logout } from "../../actions/auth";

class NavBar extends React.Component {
  signout = () => this.props.dispatch(logout());

  render() {
    const { isAuthenticated } = this.props;
    return (
      <Segment>
        <Menu fixed="top" color="blue">
          <Menu.Item name="Nearby Shops App" as={Link} to="/">
            Nearby Shops App
          </Menu.Item>

          {!isAuthenticated && (
            <Menu.Menu position="right">
              <Menu.Item name="Signup" as={Link} to="/signup">
                Signup
              </Menu.Item>
              <Menu.Item name="Login" as={Link} to="/login">
                Login
              </Menu.Item>
            </Menu.Menu>
          )}

          {isAuthenticated && (
            <Menu.Menu position="right">
              <Menu.Item name="Nearby Shops" as={Link} to="/nearby">
                Nearby Shops
              </Menu.Item>
              <Menu.Item name="My Preferred Shops" as={Link} to="/preferred">
                My Preferred Shops
              </Menu.Item>
              <Menu.Item name="Logout" as={Button} onClick={this.signout}>
                Logout
              </Menu.Item>
            </Menu.Menu>
          )}
        </Menu>
      </Segment>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!localStorage.token
  };
}

export default connect(mapStateToProps)(NavBar);
