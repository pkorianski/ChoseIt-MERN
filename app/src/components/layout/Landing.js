import React, { useState } from "react";
import {
  Jumbotron,
  Button,
  Container,
  Row,
  Col,
  Card,
  CardTitle,
  CardText,
  CardDeck,
  CardSubtitle,
  CardBody,
  CardHeader,
  CardFooter,
  ListGroup,
  ListGroupItem
} from "reactstrap";
import PropTypes from "prop-types";

const Landing = props => {
  const heads_or_tails = {
    choices: ["Heads", "Tails"]
  };
  const movies = {
    choices: ["The Joker", "Star Wars", "Frozen 2"]
  };
  const restaurants = {
    choices: ["Fridays", "Applebees", "Yardhouse"]
  };

  // Setting Card decision states
  const [hort, setHort] = useState(null);
  const [movie, setMovie] = useState(null);
  const [restaurant, setRestaurant] = useState(null);

  const choseItSelector = (dataSource, f) => {
    const dataSourceLength = dataSource.choices.length;
    const indexPicked = Math.floor(Math.random() * dataSourceLength + 1) - 1;
    dataSource.decision = dataSource.choices[indexPicked];
    f(dataSource.choices[indexPicked]);
  };

  return (
    <div>
      <Jumbotron>
        <h1 className="display-3">Getting Started</h1>
        <p className="lead">
          This web application allows you to stop stressing about making
          decisions and allows you to have more fun!
        </p>
        <hr className="my-2" />
        <p>Below are three examples for your pleasure. Enjoy and have fun :)</p>
        <Button href="signup" color="secondary">
          Sign Up Free Today
        </Button>
      </Jumbotron>
      <CardDeck style={{}}>
        <Card>
          <CardHeader tag="h4">Heads or Tails</CardHeader>
          <CardBody>
            <CardTitle tag="h6">Description</CardTitle>
            <CardText>A Simple but elegant Heads or Tails picker</CardText>
            <ListGroup>
              <ListGroupItem tag="button" action>
                Heads
              </ListGroupItem>
              <ListGroupItem tag="button" action>
                Tails
              </ListGroupItem>
            </ListGroup>
            <br />
            <Button onClick={() => choseItSelector(heads_or_tails, setHort)}>
              Press Me
            </Button>
          </CardBody>
          <CardFooter>
            <b>Decision: </b>
            {props.decision}
            <span className="text-success">
              <b>{hort}</b>
            </span>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader tag="h4">Movies</CardHeader>
          <CardBody>
            <CardTitle tag="h6">Description</CardTitle>
            <CardText>What movie are you watching tonight?</CardText>
            <ListGroup>
              <ListGroupItem tag="button" action>
                The Joker
              </ListGroupItem>
              <ListGroupItem tag="button" action>
                Star Wars
              </ListGroupItem>
              <ListGroupItem tag="button" action>
                Frozen 2
              </ListGroupItem>
            </ListGroup>
            <br />
            <Button onClick={() => choseItSelector(movies, setMovie)}>
              Press Me
            </Button>
          </CardBody>
          <CardFooter>
            <b>Decision: </b>
            {props.decision}
            <span className="text-success">
              <b>{movie}</b>
            </span>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader tag="h4">Restaurants</CardHeader>
          <CardBody>
            <CardTitle tag="h6">Description</CardTitle>
            <CardText>Where are you taking your loved one to dinner?</CardText>
            <ListGroup>
              <ListGroupItem tag="button" action>
                Fridays
              </ListGroupItem>
              <ListGroupItem tag="button" action>
                Applebees
              </ListGroupItem>
              <ListGroupItem tag="button" action>
                Yardhouse
              </ListGroupItem>
            </ListGroup>
            <br />
            <Button onClick={() => choseItSelector(restaurants, setRestaurant)}>
              Press Me
            </Button>
          </CardBody>
          <CardFooter>
            <b>Decision: </b>
            {props.decision}
            <span className="text-success">
              <b>{restaurant}</b>
            </span>
          </CardFooter>
        </Card>
      </CardDeck>
    </div>
  );
};

Landing.propTypes = {};

export default Landing;
