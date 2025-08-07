import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCompanyData,
  addClient,
  updateClient,
  deleteClient,
} from "../../features/clients/clientsSlice";
import MobileClient from "../MobileClient/MobileClient";
import { emitter } from "../../utilits/EventEmitter/EventEmitter";
import "./MobileCompany.css";

const MobileCompany = () => {
  const [filter, setFilter] = useState("all");
  const dispatch = useDispatch();
  const { companyName, clients, status } = useSelector(
    (state) => state.clients
  );

  useEffect(() => {
    dispatch(fetchCompanyData());
    const handleUpdate = (client) => dispatch(updateClient(client));
    const handleDelete = (id) => dispatch(deleteClient(id));

    emitter.on("updateClient", handleUpdate);
    emitter.on("deleteClient", handleDelete);

    return () => {
      emitter.off("updateClient", handleUpdate);
      emitter.off("deleteClient", handleDelete);
    };
  }, [dispatch]);

  const filteredClients = React.useMemo(() => {
    return filter === "all"
      ? clients
      : clients.filter((c) => c.status === filter);
  }, [clients, filter]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Error loading data</div>;

  return (
    <div className="MobileCompany">
      <h1>Компания: {companyName}</h1>
      <div className="controls">
        <div>
          <button onClick={() => setFilter("all")}>Все</button>
          <button onClick={() => setFilter("active")}>Активные</button>
          <button onClick={() => setFilter("blocked")}>Заблокированные</button>
        </div>
        <div>
          <button onClick={() => dispatch(addClient())}>
            Добавить клиента
          </button>
        </div>
      </div>
      <table>
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
    </div>
  );
};

export default React.memo(MobileCompany);
