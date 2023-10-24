import React, { useState } from 'react';
import logo from './assets/logo.png';
import './styles/login.css';

const Login = () => {
  const [user, setuser] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className='tela-login'>
      <div className='logo'>
        <img src={logo} alt="Logo" />
      </div>
      <h2>
      <span className="help-text">Help</span><span className="delphi-text">Delphi</span>
      </h2>
      <form>
        <div>
          <label>Usuário</label>
          <br></br>
          <input
            type="user"
            value={user}
            onChange={(e) => setuser(e.target.value)}
          />
        </div>
        <div>
          <label>Senha</label>
          <br></br>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <br></br>
        <div className="login-button">
        <button type="button">
          Acessar
        </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
