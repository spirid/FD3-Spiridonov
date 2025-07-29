import React from "react";
import PropTypes from "prop-types";
import { emitter } from "../../utilits/EventEmitter/EventEmitter";

import "./MobileClient.css";

class MobileClient extends React.PureComponent {
  static propTypes = {
    client: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      surName: PropTypes.string.isRequired,
      patronymic: PropTypes.string.isRequired,
      balance: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
    }).isRequired,
  };

  state = {
    isEditing: false,
    editedClient: { ...this.props.client },
  };

  surnameRef = React.createRef();
  nameRef = React.createRef();
  patronymicRef = React.createRef();
  balanceRef = React.createRef();
  statusRef = React.createRef();

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!prevState.isEditing && nextProps.client !== prevState.editedClient) {
      return { editedClient: { ...nextProps.client } };
    }
    return null;
  }

  startEditing = () => {
    this.setState({
      isEditing: true,
      editedClient: { ...this.props.client },
    });
  };

  cancelEditing = () => {
    this.setState({
      isEditing: false,
      editedClient: { ...this.props.client },
    });
  };

  saveChanges = () => {
    const updatedClient = {
      ...this.state.editedClient,
      surName: this.surnameRef.current.value,
      name: this.nameRef.current.value,
      patronymic: this.patronymicRef.current.value,
      balance: Number(this.balanceRef.current.value),
      status: this.statusRef.current.value,
    };
    emitter.emit("updateClient", updatedClient);
    this.setState({ isEditing: false });
  };

  deleteClient = () => {
    emitter.emit("deleteClient", this.props.client.id);
  };

  render() {
    console.log("MobileClient id=" + this.props.client.id + " render");

    const { client } = this.props;
    const { isEditing, editedClient } = this.state;

    if (isEditing) {
      return (
        <tr className="MobileClient editing">
          <td>
            <input
              type="text"
              defaultValue={editedClient.surName}
              ref={this.surnameRef}
            />
          </td>
          <td>
            <input
              type="text"
              defaultValue={editedClient.name}
              ref={this.nameRef}
            />
          </td>
          <td>
            <input
              type="text"
              defaultValue={editedClient.patronymic}
              ref={this.patronymicRef}
            />
          </td>
          <td>
            <input
              type="number"
              defaultValue={editedClient.balance}
              ref={this.balanceRef}
            />
          </td>
          <td>
            <select defaultValue={editedClient.status} ref={this.statusRef}>
              <option value="active">Активный</option>
              <option value="blocked">Заблокированный</option>
            </select>
          </td>
          <td>
            <button onClick={this.saveChanges}>Сохранить</button>
            <button onClick={this.cancelEditing}>Отмена</button>
          </td>
          <td>
            <button onClick={this.deleteClient}>Удалить</button>
          </td>
        </tr>
      );
    }

    return (
      <tr className="MobileClient">
        <td>{client.surName}</td>
        <td>{client.name}</td>
        <td>{client.patronymic}</td>
        <td>{client.balance}</td>
        <td>{client.status === "active" ? "Активный" : "Заблокированный"}</td>
        <td>
          <button onClick={this.startEditing}>Редактировать</button>
        </td>
        <td>
          <button onClick={this.deleteClient}>Удалить</button>
        </td>
      </tr>
    );
  }
}

export default MobileClient;
