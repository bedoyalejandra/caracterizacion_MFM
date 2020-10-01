import React, { Component } from "react";
import axios from "axios";
import { Form, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import "../styles/Input.css";
import { GoPlus } from "react-icons/go";
import ImgDog from "../images/animals/dog.png";


const url = "http://localhost:3000/";

class Features extends Component {
  state = {
    data: [],
    categories: [],
    modalInsert: false,
    modalDelete: false,
    message: "",
    form: {
      id: "",
      id_category: "",
      name: "",
    },
    typeModal: "",
  };

  requestGetCategories = () => {
    axios
      .get(url + "categories")
      .then((response) => {
        this.setState({ categories: response.data.Categories });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  requestGet = () => {
    axios
      .get(url + "features")
      .then((response) => {
        this.setState({ data: response.data.Features });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  requestPost = async () => {
    if (!this.state.form) {
      this.setState({ message: "El nombre y la categoría son obligatorios" });
      return
    }
    
      delete this.state.form.id;
      await axios
        .post(url + "feature/" + this.state.form.name, this.state.form)
        .then((response) => {
          this.modalInsert();
          this.requestGet();
        })
        .catch((error) => {
          console.log(error.message);
        });
    
  };

  requestPut = async () => {
    if(this.state.form.name === '' || this.state.form.id_type === ''){
      this.setState({ message: "El nombre y la categoría son obligatorios" });
      return
    }
    axios
      .put(url + "update_feature/" + this.state.form.id, this.state.form)
      .then((response) => {
        this.modalInsert();
        this.requestGet();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  requestDelete = async () => {
    axios.delete(url + "feature/" + this.state.form.name).then((response) => {
      this.setState({ modalDelete: false });
      this.requestGet();
    });
  };

  selectFeature = (feature) => {
    this.setState({
      typeModal: "Update",
      form: {
        id: feature.id,
        id_category: feature.id_category,
        name: feature.name,
      },
    });
  };

  componentDidMount() {
    this.requestGet();
    this.requestGetCategories();
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
              <img src={ImgDog} height="50" />
                <h1>CARACTERÍSTICAS</h1>
                <div className="span">***</div>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => {
                    this.setState({ form: null, typeModal: "Insert" });
                    this.modalInsert();
                  }}
                >
                  <GoPlus/>
                </button>
              </div>
              <br />

              <table striped hover>
                <thead>
                  <tr>
                    <th className="w-25 p-3">Id</th>
                    <th className="w-25 p-3">Categoría</th>
                    <th className="w-25 p-3">Nombre</th>
                    <th className="w-25 p-3">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.data.map((feature) => {
                    return (
                      <tr>
                        <td>{feature.id}</td>
                        <td>{feature.id_category}</td>
                        <td>{feature.name}</td>
                        <td>
                          <button
                            className="btn btn-info"
                            onClick={() => {
                              this.selectFeature(feature);
                              this.modalInsert();
                            }}
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                          {"  "}
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                              this.selectFeature(feature);
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

        <Modal isOpen={this.state.modalInsert} centered>
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
              <label htmlFor="name">Categoría</label>
              <Form.Control
                as="select"
                className="mr-sm-2"
                id="id_category"
                name="id_category"
                value={form ? form.id_category : ""}
                onChange={this.handleChange}
                custom
              >
                <option disabled>Seleccione una opción</option>;
                {this.state.categories.map((category) => {
                  return <option value={category.id}>{category.name}</option>;
                })}
              </Form.Control>
              <br />
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

export default Features;
