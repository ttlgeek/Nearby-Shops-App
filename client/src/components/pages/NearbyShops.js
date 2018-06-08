import React from "react";
import { connect } from "react-redux";
import { Segment, Header } from "semantic-ui-react";
import axios from "axios";
// import * as shops from "../../actions/shops";

import Shop from "../shop/Shop";

class NearbyShops extends React.Component {
  state = {
    nearby: [],
    preferred: []
  };

  componentDidMount() {
    axios.defaults.headers.common.authorization = localStorage.token;
    axios.get("/api/nearbyShops").then(data => {
      // console.log(data.data[0].picture)
      this.setState({ nearby: data.data });
    });
    axios
      .post("api/preferredShops", {
        email: localStorage.user_email
      })
      .then(data => this.setState({ preferred: data.data }));
  }

  render() {
    const listShops = this.state.nearby.map(i => (
      <Shop key={i._id} id={i._id} imageSrc={i.picture} name={i.name} />
    ));
    return (
      <div>
        <Segment>
          <Header as="h1" textAlign="center">
            Nearby Shops
          </Header>
        </Segment>
        <img src="http://placehold.it/150x150" alt="" />
        <Segment>
          <ul>{listShops}</ul>
        </Segment>
      </div>
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
