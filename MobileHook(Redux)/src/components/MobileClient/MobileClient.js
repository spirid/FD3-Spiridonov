import React, { useState, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import { emitter } from "../../utilits/EventEmitter/EventEmitter";
import "./MobileClient.css";

const MobileClient = ({ client }) => {
  const [isEditing, setIsEditing] = useState(false);
  const surnameRef = useRef();
  const nameRef = useRef();
  const patronymicRef = useRef();
  const balanceRef = useRef();

  const saveChanges = useCallback(() => {
    const updatedClient = {
      ...client,
      surName: surnameRef.current.value,
      name: nameRef.current.value,
      patronymic: patronymicRef.current.value,
      balance: Number(balanceRef.current.value),
      status: balanceRef.current.value >= 0 ? "active" : "blocked",
    };
    emitter.emit("updateClient", updatedClient);
    setIsEditing(false);
  }, [client]);

  if (isEditing) {
    return (
      <tr>
        <td>
          <input defaultValue={client.surName} ref={surnameRef} />
        </td>
        <td>
          <input defaultValue={client.name} ref={nameRef} />
        </td>
        <td>
          <input defaultValue={client.patronymic} ref={patronymicRef} />
        </td>
        <td>
          <input type="number" defaultValue={client.balance} ref={balanceRef} />
        </td>
        <td>{client.balance >= 0 ? "Активный" : "Заблокированный"}</td>
        <td>
          <button onClick={saveChanges}>Сохранить</button>
        </td>
        <td>
          <button onClick={() => setIsEditing(false)}>Отмена</button>
        </td>
      </tr>
    );
  }

  return (
    <tr>
      <td>{client.surName}</td>
      <td>{client.name}</td>
      <td>{client.patronymic}</td>
      <td>{client.balance}</td>
      <td>{client.balance >= 0 ? "Активный" : "Заблокированный"}</td>
      <td>
        <button onClick={() => setIsEditing(true)}>Редактировать</button>
      </td>
      <td>
        <button onClick={() => emitter.emit("deleteClient", client.id)}>
          Удалить
        </button>
      </td>
    </tr>
  );
};

MobileClient.propTypes = {
  client: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    surName: PropTypes.string.isRequired,
    patronymic: PropTypes.string.isRequired,
    balance: PropTypes.number.isRequired,
  }).isRequired,
};

export default React.memo(MobileClient);
