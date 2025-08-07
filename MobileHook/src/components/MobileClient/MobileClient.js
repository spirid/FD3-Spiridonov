import React, { useState, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import { emitter } from "../../utilits/EventEmitter/EventEmitter";
import "./MobileClient.css";

const MobileClient = React.memo(({ client }) => {
  const [isEditing, setIsEditing] = useState(false);
  const surnameRef = useRef(null);
  const nameRef = useRef(null);
  const patronymicRef = useRef(null);
  const balanceRef = useRef(null);
  const statusRef = useRef(null);

  console.log(`MobileClient id=${client.id} render`);

  const startEditing = useCallback(() => {
    setIsEditing(true);
  }, []);

  const cancelEditing = useCallback(() => {
    setIsEditing(false);
  }, []);

  const saveChanges = useCallback(() => {
    const updatedClient = {
      ...client,
      surName: surnameRef.current.value,
      name: nameRef.current.value,
      patronymic: patronymicRef.current.value,
      balance: Number(balanceRef.current.value),
      status: statusRef.current.value,
    };
    emitter.emit("updateClient", updatedClient);
    setIsEditing(false);
  }, [client]);

  const deleteClient = useCallback(() => {
    emitter.emit("deleteClient", client.id);
  }, [client.id]);

  if (isEditing) {
    return (
      <tr className="MobileClient editing">
        <td>
          <input type="text" defaultValue={client.surName} ref={surnameRef} />
        </td>
        <td>
          <input type="text" defaultValue={client.name} ref={nameRef} />
        </td>
        <td>
          <input
            type="text"
            defaultValue={client.patronymic}
            ref={patronymicRef}
          />
        </td>
        <td>
          <input type="number" defaultValue={client.balance} ref={balanceRef} />
        </td>
        <td>
          <select defaultValue={client.status} ref={statusRef}>
            <option value="active">Активный</option>
            <option value="blocked">Заблокированный</option>
          </select>
        </td>
        <td>
          <button onClick={saveChanges}>Сохранить</button>
          <button onClick={cancelEditing}>Отмена</button>
        </td>
        <td>
          <button onClick={deleteClient}>Удалить</button>
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
        <button onClick={startEditing}>Редактировать</button>
      </td>
      <td>
        <button onClick={deleteClient}>Удалить</button>
      </td>
    </tr>
  );
});

MobileClient.propTypes = {
  client: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    surName: PropTypes.string.isRequired,
    patronymic: PropTypes.string.isRequired,
    balance: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
};

export default MobileClient;
