import React, { Component, Fragment } from "react";
import FormInput from "../components/Form";
import Types from "../components/Types";

import "bootstrap/dist/css/bootstrap.css";
import { Button, Form, Navbar, NavDropdown, Nav, FormControl } from "react-bootstrap";


class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
    };
  }
  render() {
    return (
      <Fragment>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">Mi Futura Mascota</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">     
            </Nav>
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
        <Types title="tipos" />
      </Fragment>
    );
  }
}

export default Input;
