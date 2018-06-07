import React from "react";
import { Link } from "react-router-dom";
import { Segment, Button, Divider } from "semantic-ui-react";
import { connect } from "react-redux";

const HomePage = ({ isAuthenticated }) => (
  <div>
    <Segment>
      <Button primary fluid as={Link} to="/login">
        Login
      </Button>
      <Divider horizontal>Or</Divider>
      <Button secondary fluid as={Link} to="/signup">
        Sign Up Now
      </Button>
    </Segment>
  </div>
);

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token
  };
}

export default connect(mapStateToProps)(HomePage);
