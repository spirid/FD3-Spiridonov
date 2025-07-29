import { PureComponent } from "react";
import { emitter } from "../../utilits/EventEmitter/EventEmitter";
import MobileClient from "../MobileClient/MobileClient";

import "./MobileCompany.css";

class MobileCompany extends PureComponent {
  state = {
    name: this.props.name,
    clients: [...this.props.clients],
    filter: "all",
  };

  componentDidMount() {
    emitter.on("updateClient", this.handleUpdateClient);
    emitter.on("deleteClient", this.handleDeleteClient);
  }

  componentWillUnmount() {
    emitter.off("updateClient", this.handleUpdateClient);
    emitter.off("deleteClient", this.handleDeleteClient);
  }

  handleUpdateClient = (updatedClient) => {
    this.setState((prevState) => ({
      clients: prevState.clients.map((client) =>
        client.id === updatedClient.id ? updatedClient : client
      ),
    }));
  };

  handleDeleteClient = (clientId) => {
    this.setState((prevState) => ({
      clients: prevState.clients.filter((client) => client.id !== clientId),
    }));
  };

  addClient = () => {
    const newId = Math.max(0, ...this.state.clients.map((c) => c.id)) + 1;
    const newClient = {
      id: newId,
      name: "Новый",
      surName: "Клиент",
      patronymic: "",
      balance: 0,
      status: "blocked",
    };
    this.setState((prevState) => ({
      clients: [newClient, ...prevState.clients],
    }));
  };

  setFilter = (filter) => {
    this.setState({ filter });
  };

  getFilteredClients = () => {
    switch (this.state.filter) {
      case "active":
        return this.state.clients.filter(
          (client) => client.status === "active"
        );
      case "blocked":
        return this.state.clients.filter(
          (client) => client.status === "blocked"
        );
      default:
        return this.state.clients;
    }
  };

  render() {
    console.log("MobileCompany render");

    const filteredClients = this.getFilteredClients();

    return (
      <div className="MobileCompany">
        <div className="MobileCompanyName">
          Компания &laquo;{this.state.name}&raquo;
        </div>

        <div className="MobileCompanyFilters">
          <button onClick={() => this.setFilter("all")}>Все</button>
          <button onClick={() => this.setFilter("active")}>Активные</button>
          <button onClick={() => this.setFilter("blocked")}>
            Заблокированные
          </button>
        </div>

        <table className="MobileCompanyClients">
          <thead>
            <tr>
              <th>Фамилия</th>
              <th>Имя</th>
              <th>Отчество</th>
              <th>Баланс</th>
              <th>Статус</th>
              <th colSpan="2">Действия</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map((client) => (
              <MobileClient key={client.id} client={client} />
            ))}
          </tbody>
        </table>

        <div className="MobileCompanyAdd">
          <button onClick={this.addClient}>Добавить клиента</button>
        </div>
      </div>
    );
  }
}

export default MobileCompany;
