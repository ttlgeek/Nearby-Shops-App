import React from "react";
import { connect } from "react-redux";
import { Segment, Header } from "semantic-ui-react";
import axios from "axios";
import * as shops from "../../actions/shops";

class NearbyShops extends React.Component {
  componentDidMount() {
    axios.defaults.headers.common.authorization = localStorage.token;
    axios
      .get("/api/nearbyShops")
      .then(data => this.props.dispatch(shops.addAllShops(data.data)));
  }
  render() {
    const { nearbyShops } = this.props;
    return (
      <Segment>
        <Header as="h1" textAlign="center">
          Nearby Shops
        </Header>
      </Segment>
    );
  }
}

function mapStateToProps(state) {
  return {
    nearbyShops: state.shop.nearby,
    preferredShops: state.shop.preferred
  };
}

export default connect(mapStateToProps)(NearbyShops);
