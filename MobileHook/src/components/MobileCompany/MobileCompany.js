import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { emitter } from "../../utilits/EventEmitter/EventEmitter";
import MobileClient from "../MobileClient/MobileClient";
import "./MobileCompany.css";

const MobileCompany = ({ name, clients: initialClients }) => {
  const [clients, setClients] = useState([...initialClients]);
  const [filter, setFilter] = useState("all");

  console.log("MobileCompany render");

  useEffect(() => {
    const handleUpdateClient = (updatedClient) => {
      setClients((prevClients) =>
        prevClients.map((client) =>
          client.id === updatedClient.id ? updatedClient : client
        )
      );
    };

    const handleDeleteClient = (clientId) => {
      setClients((prevClients) =>
        prevClients.filter((client) => client.id !== clientId)
      );
    };

    emitter.on("updateClient", handleUpdateClient);
    emitter.on("deleteClient", handleDeleteClient);

    return () => {
      emitter.off("updateClient", handleUpdateClient);
      emitter.off("deleteClient", handleDeleteClient);
    };
  }, []);

  const addClient = () => {
    const newId = Math.max(0, ...clients.map((c) => c.id)) + 1;
    const newClient = {
      id: newId,
      name: "Новый",
      surName: "Клиент",
      patronymic: "",
      balance: 0,
      status: "blocked",
    };
    setClients([newClient, ...clients]);
  };

  const filteredClients = useMemo(() => {
    switch (filter) {
      case "active":
        return clients.filter((client) => client.status === "active");
      case "blocked":
        return clients.filter((client) => client.status === "blocked");
      default:
        return clients;
    }
  }, [clients, filter]);

  return (
    <div className="MobileCompany">
      <div className="MobileCompanyName">Компания &laquo;{name}&raquo;</div>

      <div className="MobileCompanyFilters">
        <button onClick={() => setFilter("all")}>Все</button>
        <button onClick={() => setFilter("active")}>Активные</button>
        <button onClick={() => setFilter("blocked")}>Заблокированные</button>
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
        <button onClick={addClient}>Добавить клиента</button>
      </div>
    </div>
  );
};

MobileCompany.propTypes = {
  name: PropTypes.string.isRequired,
  clients: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      surName: PropTypes.string.isRequired,
      patronymic: PropTypes.string.isRequired,
      balance: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default React.memo(MobileCompany);
