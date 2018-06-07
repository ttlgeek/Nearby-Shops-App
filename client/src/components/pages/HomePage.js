import React from "react";
import { Segment, Header } from "semantic-ui-react";

class HomePage extends React.Component {
  render() {
    const style = { textAlign: "center" };
    return (
      <Segment>
        <Header as="h1" textAlign="center">
          Welcome to the Neaby Shops App!
        </Header>
        <p style={style}>
          To create an account or sign in, please use the buttons in the top
          right corner
        </p>
      </Segment>
    );
  }
}

export default HomePage;
