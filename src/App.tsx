import "./styles/app.css";
import Table, { TableProps } from "./components/Table";
import Header from "./components/Header";
import logo from "./assets/user.png";

const App = () => {
  const dados: TableProps = {
    data: [
      {
        clientId: "1",
        subject: "Teste",
        criticality: "Alta",
        status: "Aberto",
        createdAt: new Date(),
        updatedAt: new Date(),
        id: "1",
      },

      {
        clientId: "2",
        subject: "Teste",
        criticality: "Alta",
        status: "Aberto",
        createdAt: new Date(),
        updatedAt: new Date(),
        id: "2",
      },
      {
        clientId: "3",
        subject: "Teste",
        criticality: "Alta",
        status: "Aberto",
        createdAt: new Date(),
        updatedAt: new Date(),
        id: "3",
      },
    ],
  };

  return (
    <>
      <Header
        userAvatar={logo}
        username="Rhuan"
        onLogout={() => console.log("")}
      />
      <div className="container">
        <Table data={dados.data} />
      </div>
    </>
  );
};


export default App;
