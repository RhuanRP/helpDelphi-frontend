import { useState } from "react";
import logo from "./assets/logo.png";
import { Button } from "./components/Button";
import "./styles/login.css";
import { Input } from "./components/Input";

const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="tela-login">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <h2>
        <span className="help-text">Help</span>
        <span className="delphi-text">Delphi</span>
      </h2>
      <form>
        <div className="form-item">
          <label>Usuário</label>
          <Input
            type="user"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </div>
        <div className="form-item">
          <label>Senha</label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="button-container">
          <Button type="button">Acessar</Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
