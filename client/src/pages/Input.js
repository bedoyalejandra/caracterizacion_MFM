import React, { Component, Fragment } from "react";
import Types from "../components/Types";
import Categories from "../components/Categories";
import TypeBreed from "../components/TypeBreed";
import Features from "../components/Features";
import Logo from "../images/logo.png";
import btnTypes from "../images/btnTypes.png";
import btnCategories from "../images/btnCategories.png";
import btnFeatures from "../images/btnFeatures.png";
import btnBreeds from "../images/btnBreed.png";
import ImgIntro from "../components/ImgIntro";


import "../index.css";
import "bootstrap/dist/css/bootstrap.css";
import {
  Button,
  Form,
  Navbar,
  Nav,
} from "react-bootstrap";

class Input extends Component {
  state = {
    condition: "",
  };

  render() {
    return (
      <Fragment>
        <Navbar bg="light" expand="lg">
          <img src={Logo} height="100" />
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto"></Nav>
            <Form inline>
              <Button
                size="sm"
                variant="light"
                onClick={() => this.setState({ condition: "type" })}
              >
                <img src={btnTypes} height="60" />
              </Button>

              <Button
                size="sm"
                variant="light"
                onClick={() => this.setState({ condition: "category" })}
              >
                <img src={btnCategories} height="60" />
              </Button>

              <Button
                size="sm"
                variant="light"
                onClick={() => this.setState({ condition: "breed" })}
              >
                <img src={btnBreeds} height="60" />
              </Button>

              <Button
                size="sm"
                variant="light"
                onClick={() => this.setState({ condition: "feature" })}
              >
                <img src={btnFeatures} height="60" />
              </Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>

        <div className="cont">
          {this.state.condition === "type" ? (
            <Types />
          ) : this.state.condition === "category" ? (
            <Categories />
          ) : this.state.condition === "breed" ? (
            <TypeBreed />
          ) : this.state.condition === "feature" ? (
            <Features />
          ) : (
            <ImgIntro />
          )}
        </div>
      </Fragment>
    );
  }
}

export default Input;
