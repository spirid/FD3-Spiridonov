import React from "react";
import MobileCompany from "./components/MobileCompany/MobileCompany";

let companyName = "A1";
let clientsArr = [
  {
    id: 101,
    name: "Иван",
    surName: "Иванович",
    patronymic: "Иванов",
    status: "active",
    balance: 200,
  },
  {
    id: 102,
    name: "Сидор",
    surName: "Сидорович",
    patronymic: "Сидорови",
    status: "active",
    balance: 200,
  },
  {
    id: 103,
    name: "Петр",
    surName: "Петров",
    patronymic: "Петрович",
    status: "active",
    balance: 180,
  },
  {
    id: 104,
    name: "Георгий",
    surName: "Георгиев",
    patronymic: "Георгиевич",
    status: "active",
    balance: 220,
  },
];

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <MobileCompany name={companyName} clients={clientsArr} />
      </div>
    );
  }
}

export default App;
