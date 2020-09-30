import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import "../styles/Form.css";

class FormInput extends Component {
  render() {
    const { title } = this.props;
    return (
      <div className="Container">
        <Form>
          <h1>{title}</h1>
          <Form.Group>
            <Form.Label>Id</Form.Label>
            <Form.Control type="text" readOnly />
            <br />
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default FormInput;
