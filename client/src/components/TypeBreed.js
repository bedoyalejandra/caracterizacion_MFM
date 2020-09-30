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

class TypeBreed extends Component {
  state = {
    data: [],
    types: [],
    modalInsert: false,
    modalDelete: false,
    form: {
      id: "",
      id_type: "",
      name: "",
    },
    typeModal: "",
  };

  requestGetTypes = () => {
    axios
      .get(url + "types")
      .then((response) => {
        this.setState({ types: response.data.Types });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  requestGet = () => {
    axios
      .get(url + "types_breeds")
      .then((response) => {
        this.setState({ data: response.data.TypesBreeds });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  requestPost = async () => {
    delete this.state.form.id;
    await axios
      .post(url + "type_breed/" + this.state.form.name, this.state.form)
      .then((response) => {
        this.modalInsert();
        this.requestGet();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  requestPut = async () => {
    axios
      .put(url + "update_type_breed/" + this.state.form.id, this.state.form)
      .then((response) => {
        this.modalInsert();
        this.requestGet();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  requestDelete = async () => {
    axios
      .delete(url + "type_breed/" + this.state.form.name)
      .then((response) => {
        this.setState({ modalDelete: false });
        this.requestGet();
      });
  };

  selectTypeBreed = (type_breed) => {
    this.setState({
      typeModal: "Update",
      form: {
        id: type_breed.id,
        id_type: type_breed.id_type,
        name: type_breed.name,
      },
    });
  };

  componentDidMount() {
    this.requestGet();
    this.requestGetTypes();
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
    console.log(this.state.form);
  };

  render() {
    const { form } = this.state;
    return (
      <div className="App">
        <Card className="text-center" style={{ width: "40rem" }}>
          <Card.Body>
            <div className="container">
              <br />
              <div className="container_title">
                <h1>RAZAS</h1>
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
                    <th className="w-25 p-3">Tipo</th>
                    <th className="w-25 p-3">Nombre</th>
                    <th className="w-25 p-3">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.data.map((type_breed) => {
                    return (
                      <tr>
                        <td>{type_breed.id}</td>
                        <td>{type_breed.id_type}</td>
                        <td>{type_breed.name}</td>
                        <td>
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              this.selectTypeBreed(type_breed);
                              this.modalInsert();
                            }}
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                          {"  "}
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                              this.selectTypeBreed(type_breed);
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
          </Card.Body>
        </Card>

        <Modal isOpen={this.state.modalInsert}>
          <ModalBody>
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
              <label htmlFor="name">Tipo</label>
              <Form.Control
                as="select"
                className="mr-sm-2"
                id="id_type"
                value={form ? form.id_type : ""}
                custom
              >
                {this.state.types.map((type) => {
                  return <option value={type.id}>{type.name}</option>;
                })}
              </Form.Control>
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

export default TypeBreed;
