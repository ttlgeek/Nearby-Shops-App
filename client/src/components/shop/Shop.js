import React from "react";
import { Card, Image } from "semantic-ui-react";

const Shop = ({ id, imgSrc, name }) => (
  <Card key={id}>
    <Image src={imgSrc} />
    <Card.Content>
      <Card.Header>{name}</Card.Header>
    </Card.Content>
  </Card>
);

export default Shop;
