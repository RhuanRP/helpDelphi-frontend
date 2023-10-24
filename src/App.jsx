import React, { useState, useEffect } from "react";
import './styles/app.css';
import Table from "./components/Table";

const App = () => {
  const [dados, setDados] = useState([
    
  ]);

  useEffect(() => {
    setDados([

    ]);
  }, []);

  return (
    <div className="container">
      <Table data={dados} />
    </div>
  );
};

export default App;
