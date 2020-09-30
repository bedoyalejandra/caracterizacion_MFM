import React, { Component, Fragment } from "react";
import FormInput from "../components/Form";
import Types from "../components/Types";
import '../index.css';
import "bootstrap/dist/css/bootstrap.css";
import { Button, Form, Navbar, NavDropdown, Nav, FormControl } from "react-bootstrap";


class Input extends Component {
  state = {
    condition: ''
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
            
              <Button variant="danger" onClick={() => 
                this.setState({condition: "type" })}>Tipos</Button>
              
              <Button variant="danger" onClick={() => 
                this.setState({condition: "category" })}>Categorías</Button>
              
              <Button variant="danger" onClick={() => 
                this.setState({condition: "breed" })}>Razas</Button>
              
              <Button variant="danger" onClick={() => 
                this.setState({condition: "feature" })}>Características</Button>
      
            </Form>
          </Navbar.Collapse>
        </Navbar>

        

        <div className="cont">
        
        { this.state.condition === "types" ? <Types /> :
        this.state.condition === "category" ? <FormInput title="Category" /> :
        this.state.condition === "breed" ? <Types title="tipos" /> :
        <Types title="tipos" /> }
        </div>
      </Fragment>
    );
  }
}

export default Input;
