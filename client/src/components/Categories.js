import React, { Component } from "react";
import axios from "axios";
import { Button, Form, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import "../styles/Input.css";
import { FaBeer } from "react-icons/fa";
import { GoPlus } from "react-icons/go";

const url = "http://localhost:3000/";

class Categories extends Component {
  state = {
    data: [],
    modalInsert: false,
    modalDelete: false,
    message: "",
    form: {
      id: "",
      name: "",
    },
    typeModal: "",
  };

  requestGet = () => {
    axios
      .get(url + "categories")
      .then((response) => {
        this.setState({ data: response.data.Categories });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  requestPost = async () => {
    if (!this.state.form) {
      this.setState({ message: "El nombre es obligatorio" });
      return;
    }
    delete this.state.form.id;
    await axios
      .post(url + "category/" + this.state.form.name)
      .then((response) => {
        this.modalInsert();
        this.requestGet();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  requestPut = async () => {
    if (this.state.form.name === "") {
      this.setState({ message: "El nombre es obligatorio" });
      return;
    }
    axios
      .put(url + "update_category/" + this.state.form.id, this.state.form)
      .then((response) => {
        this.modalInsert();
        this.requestGet();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  requestDelete = async () => {
    axios.delete(url + "category/" + this.state.form.name).then((response) => {
      this.setState({ modalDelete: false });
      this.requestGet();
    });
  };

  selectCategory = (category) => {
    this.setState({
      typeModal: "Update",
      form: {
        id: category.id,
        name: category.name,
      },
    });
  };

  componentDidMount() {
    this.requestGet();
  }

  modalInsert = () => {
    this.setState({ modalInsert: !this.state.modalInsert });
  };

  handleChange = async (e) => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    const { form } = this.state;
    return (
      <div className="App">
        <br />
        <br />
        <Card className="text-center" style={{ width: "40rem" }}>
          <Card.Body>
            <div className="container">
              <br />
              <div className="container_title">
                <h1>CATEGORÍAS</h1>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => {
                    this.setState({ form: null, typeModal: "Insert" });
                    this.modalInsert();
                  }}
                >
                  <GoPlus />
                </button>
              </div>
              <br />

              <table striped hover>
                <thead>
                  <tr>
                    <th className="w-25 p-3">Id</th>
                    <th className="w-25 p-3">Nombre</th>
                    <th className="w-25 p-3">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.data.map((category) => {
                    return (
                      <tr>
                        <td>{category.id}</td>
                        <td>{category.name}</td>
                        <td>
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              this.selectCategory(category);
                              this.modalInsert();
                            }}
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                          {"  "}
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                              this.selectCategory(category);
                              this.setState({ modalDelete: true });
                            }}
                          >
                            <FontAwesomeIcon icon={faTrashAlt} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <br />
          </Card.Body>
        </Card>

        <Modal isOpen={this.state.modalInsert}>
          <ModalBody>
            <div className="error">{this.state.message}</div>
            <div className="form-group">
              <label htmlFor="id">Id</label>
              <input
                className="form-control"
                type="text"
                name="id"
                id="id"
                readOnly
                onChange={this.handleChange}
                value={form ? form.id : this.state.data.length + 2}
              />
              <br />
              <label htmlFor="name">Nombre</label>
              <input
                className="form-control"
                type="text"
                name="name"
                id="name"
                onChange={this.handleChange}
                value={form ? form.name : ""}
              />
              <br />
            </div>
          </ModalBody>
          <ModalFooter>
            {this.state.typeModal === "Insert" ? (
              <button
                className="btn btn-primary"
                onClick={() => this.requestPost()}
              >
                Insertar
              </button>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => this.requestPut()}
              >
                Actualizar
              </button>
            )}
            <button
              className="btn btn-danger"
              onClick={() => this.modalInsert()}
            >
              Cancelar
            </button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalDelete}>
          <ModalBody>
            ¿Estás seguro que deseas eliminar {form && form.name}?
          </ModalBody>
          <ModalFooter>
            <button
              className="btn btn-danger"
              onClick={() => this.requestDelete()}
            >
              Si
            </button>
            <button
              className="btn btn-secundary"
              onClick={() => this.setState({ modalDelete: false })}
            >
              No
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default Categories;
