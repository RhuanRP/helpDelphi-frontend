import { useState } from "react";
import "./styles.css";
import { Button } from "../Button";
import Header from "../Header";


function Admin() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <Header />
      <div className="view-admin">
        <div className="form-line">
          <h1>Cadastro de usuário</h1>
          <div className="form-contents">
            <div className="form-inputs">

              <div className="form-left">
                <label>
                  <p>Nome</p>
                  <input type="text-name" />
                </label>

                <label>
                  <p>Empresa</p>
                  <input type="text-company" />
                </label>

                <label>
                  <p>E-mail</p>
                  <input type="text-email" />
                </label>

                <br></br>
                <div className="login-center">
                  <label>
                    <p>Login</p>
                    <input type="text-login" />
                  </label>
                </div>
              </div>

              <div className="form-right">

                <label>
                  <p>CPF/CNPJ</p>
                  <input type="text-document" />
                </label>

                <label>
                  <p>Telefone</p>
                  <input type="text-tel" />
                </label>

                <label>
                  Tipo de cadastro
                  <select>
                    <option value="cliente">Cliente</option>
                    <option value="funcionario">Tecnico</option>
                  </select>
                </label>
                <br></br>
                <div className="password-center"></div>
                <label>
                  <p>Senha</p>
                  <input type="text-password" />
                </label>
              </div>
            </div>
          </div>

          <br></br>
          <div className="button-action">
            <Button type="button" onClick={() => setShowPopup(true)}>
              Salvar
            </Button>
            <Button type="button" onClick={() => setShowPopup(false)}>
              Fechar
            </Button>
          </div>
        </div>
      </div></>
  );
}

export default Admin;
