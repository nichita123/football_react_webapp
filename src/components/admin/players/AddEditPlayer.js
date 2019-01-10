import React, { Component } from "react";

import AdminLayout from "../../../Hoc/AdminLayout";
import FormField from "../../ui/formFields";
import { validate } from "../../ui/misc";

import { firebase, firebaseDB, firebasePlayers } from "../../../firebase";

import Fileuploader from "../../ui/Fileuploader";

import CircularProgress from "@material-ui/core/CircularProgress";

class AddEditPlayer extends Component {
  state = {
    isLoading: true,
    playerId: "",
    formType: "",
    formError: false,
    formSuccess: "",
    defaultImg: "",
    formData: {
      name: {
        element: "input",
        value: "",
        config: {
          label: "Player Name",
          name: "name_input",
          type: "text"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: true
      },
      lastname: {
        element: "input",
        value: "",
        config: {
          label: "Player Last Name",
          name: "lastname_input",
          type: "text"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: true
      },
      number: {
        element: "input",
        value: "",
        config: {
          label: "Player Number",
          name: "number_input",
          type: "number"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: true
      },
      position: {
        element: "select",
        value: "",
        config: {
          label: "Select position",
          name: "select_position",
          type: "select",
          options: [
            {
              key: "Keeper",
              value: "Keeper"
            },
            {
              key: "Defence",
              value: "Defence"
            },
            {
              key: "Midfield",
              value: "Midfield"
            },
            {
              key: "Striker",
              value: "Striker"
            }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: true
      },
      image: {
        element: "image",
        value: "",
        validation: {
          required: true
        },
        valid: true
      }
    }
  };

  componentDidMount() {
    const playerId = this.props.match.params.id;

    if (!playerId) {
      this.setState({
        formType: "Add Player"
      });
    } else {
      firebaseDB
        .ref(`players/${playerId}`)
        .once("value")
        .then(snapshot => {
          const playerData = snapshot.val();

          firebase
            .storage()
            .ref("players")
            .child(playerData.image)
            .getDownloadURL()
            .then(url => {
              this.updateFields(playerData, playerId, "Edit player", url);
            })
            .catch(e => {
              this.updateFields(
                {
                  ...playerData,
                  image: ""
                },
                playerId,
                "Edit player",
                ''
              );
            });
        });
    }

    setTimeout(() => {
      this.setState({
        isLoading: false
      });
    }, 1000);
  }

  updateFields = (player, playerId, formType, defaultImg) => {
    const newFormData = { ...this.state.formData };

    for (let key in newFormData) {
      newFormData[key].value = player[key];
      newFormData[key].valid = true;

      this.setState({
        playerId,
        defaultImg,
        formType,
        formData: newFormData
      });
    }
  };

  updateForm(element, content = "") {
    const newFormData = { ...this.state.formData };
    const newElement = { ...newFormData[element.id] };

    if (content === "") {
      newElement.value = element.event.target.value;
    } else {
      newElement.value = content;
    }

    let validData = validate(newElement);

    newElement.valid = validData[0];
    newElement.validationMessage = validData[1];

    newFormData[element.id] = newElement;

    this.setState({
      formError: false,
      formData: newFormData
    });
  }

  succesForm = message => {
    this.setState({
      formSuccess: message
    });

    setTimeout(() => {
      this.setState({
        formSuccess: ""
      });
    }, 3000);
  };

  submitForm(event) {
    event.preventDefault();

    let dataToSubmit = {};
    let formIsValid = true;

    for (let key in this.state.formData) {
      dataToSubmit[key] = this.state.formData[key].value;
      formIsValid = this.state.formData[key].valid && formIsValid;
    }

    if (formIsValid) {
      if (this.state.formType === "Edit player") {
        firebaseDB
          .ref(`players/${this.state.playerId}`)
          .update(dataToSubmit)
          .then(() => {
            this.succesForm("Updated...");
          })
          .catch(e => {
            this.setState({
              formError: true
            });
          });
      } else {
        firebasePlayers
          .push(dataToSubmit)
          .then(() => {
            this.props.history.push("/admin/players");
          })
          .catch(e => {
            this.setState({
              formError: true
            });
          });
      }
    } else {
      this.setState({
        formError: true
      });
    }
  }

  resetImage = () => {
    const newFormData = { ...this.state.formData };

    firebase
      .storage()
      .ref("players")
      .child(newFormData["image"].value)
      .delete()
      .then(console.log("deleted from db"));

    newFormData["image"].value = "";
    newFormData["image"].valid = false;

    this.setState({
      defaultImg: "",
      formData: newFormData
    });
  };

  storeFilename = filename => {
    this.updateForm({ id: "image" }, filename);
  };

  render() {
    return (
      <AdminLayout>
        {this.state.isLoading ? (
          <div className="admin_progress">
            <CircularProgress
              thickness={5}
              style={{
                color: "#98c5e9"
              }}
            />
          </div>
        ) : (
          <div className="editplayers_dialog_wrapper">
            <h2>{this.state.formType}</h2>
            <div>
              <form onSubmit={event => this.submitForm(event)}>
                <Fileuploader
                  dir="players"
                  tag={"Player image"}
                  defaultImg={this.state.defaultImg}
                  defaultImgName={this.state.formData.image.value}
                  resetImage={() => this.resetImage()}
                  filename={filename => this.storeFilename(filename)}
                />

                <FormField
                  id={"name"}
                  formData={this.state.formData.name}
                  change={element => this.updateForm(element)}
                />

                <FormField
                  id={"lastname"}
                  formData={this.state.formData.lastname}
                  change={element => this.updateForm(element)}
                />

                <FormField
                  id={"number"}
                  formData={this.state.formData.number}
                  change={element => this.updateForm(element)}
                />

                <FormField
                  id={"position"}
                  formData={this.state.formData.position}
                  change={element => this.updateForm(element)}
                />

                <div className="success_label">{this.state.formSuccess}</div>

                {this.state.formError ? (
                  <div className="error_label">Something is wrong</div>
                ) : (
                  ""
                )}

                <div className="admin_submit">
                  <button onClick={event => this.submitForm(event)}>
                    {this.state.formType}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </AdminLayout>
    );
  }
}

export default AddEditPlayer;
