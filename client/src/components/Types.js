import React, { Component } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import "../styles/Input.css";
import { GoPlus } from "react-icons/go";
import ImgRabbit from "../images/animals/rabbit.png";

const url = "http://localhost:3000/";

class Types extends Component {
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
      .get(url + "types")
      .then((response) => {
        this.setState({ data: response.data.Types });
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
      .post(url + "type/" + this.state.form.name)
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
      .put(url + "update_type/" + this.state.form.id, this.state.form)
      .then((response) => {
        this.modalInsert();
        this.requestGet();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  requestDelete = async () => {
    axios.delete(url + "type/" + this.state.form.name).then((response) => {
      this.setState({ modalDelete: false });
      this.requestGet();
    });
  };

  selectType = (type) => {
    this.setState({
      typeModal: "Update",
      form: {
        id: type.id,
        name: type.name,
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
            <br />
            <div className="container">
              <div className="container_title">
                <img src={ImgRabbit} height="50" />      
                <h1>TIPOS</h1>
                <div className="span">***</div>
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
                  {this.state.data.map((type) => {
                    return (
                      <tr>
                        <td>{type.id}</td>
                        <td>{type.name}</td>
                        <td>
                          <button
                            className="btn btn-info"
                            onClick={() => {
                              this.selectType(type);
                              this.modalInsert();
                            }}
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                          {"  "}
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                              this.selectType(type);
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
              <br />
            </div>
          </Card.Body>
        </Card>

        <Modal isOpen={this.state.modalInsert} centered>
          <ModalBody>
            <div className="alerta-error">{this.state.message}</div>
            <div className="form-group">
              <label>Id</label>
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
              
            </div>
          </ModalBody>
          <ModalFooter>
            {this.state.typeModal === "Insert" ? (
              <button
                className="btn btn-info"
                onClick={() => this.requestPost()}
              >
                Insertar
              </button>
            ) : (
              <button
                className="btn btn-info"
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

        <Modal isOpen={this.state.modalDelete} centered>
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

export default Types;
