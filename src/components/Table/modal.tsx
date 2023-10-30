// Modal.tsx
import React, { useState } from "react";
import "./modal.css";
import { Button } from "../Button";

type ModalProps = {
  // 
};

const Modal: React.FC<ModalProps> = (props) => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-inputs">
          <div className="modal-left">
            <label>
              <p>Cliente</p>
              <input type="text-client" />
            </label>

            <label>
              <p>Assunto</p>
              <input type="text-subject" />
            </label>
          </div>

          <div className="modal-right">
            <label>
              Status
              <select onChange={(e) => setShowPopup(e.target.value === "pausado")}>
                <option value="aguardando">Aguardando</option>
                <option value="em-andamento">Em andamento</option>
                <option value="pausado">Pausado</option>
                <option value="resolvido">Resolvido</option>
              </select>
            </label>
            <label>Criticidade
              <select>
                <option value="baixa">Baixa</option>
                <option value="media">Média</option>
                <option value="alta">Alta</option>
              </select>
            </label>
          </div>
        </div>

        <label className="text-description">
          Descrição
          <textarea />
        </label>

        <label className="historic-actions">
          Histórico de Ações
          <textarea />
          <ul>
            { }
          </ul>
        </label>
        <div className="button-action">
          <Button type="button">Salvar</Button>
          <Button type="button">Cancelar</Button>
        </div>
        {showPopup && (
          <div className="popup">
            <label>
              Motivo da Pausa
              <input type="text" />
            </label>
            <div className="button-action">
              <Button type="button" onClick={() => setShowPopup(true)}>Salvar</Button>
              <Button type="button" onClick={() => setShowPopup(false)}>Fechar</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
