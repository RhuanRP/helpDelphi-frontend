import { useState, useEffect } from "react";
import "./styles/app.css";
import Table from "./components/Table";
import Header from "./components/Header";

const App = () => {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    setDados([]);
  }, []);

  return (
    <>
      <Header />
      <div className="container">
        <Table data={dados} />
      </div>
    </>
  );
};

export default App;
