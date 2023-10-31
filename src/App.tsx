import "./styles/app.css";
import Table, { TableProps } from "./components/Table";
import Header from "./components/Header";
import logo from "./assets/user.png";
import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

function App() {
  const [cookies] = useCookies(["helpdelphi_api_token"]);
  const navigate = useNavigate();
  const { signOut } = useAuth();

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

  React.useEffect(() => {
    if (typeof cookies.helpdelphi_api_token !== "string") {
      navigate("/login");
    }
  }, [cookies, navigate]);

  return (
    <>
      <Header userAvatar={logo} username="Rhuan" onLogout={signOut} />
      <div className="container">
        <Table data={dados.data} />
      </div>
    </>
  );
}

export default App;
