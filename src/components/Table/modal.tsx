// Modal.tsx
import React from "react";

type ModalProps = {
  // 
};

const Modal: React.FC<ModalProps> = (props) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <label>
          <p>Cliente</p>
          <input type="text-client"  />
          </label>
          
          <label>
          Status
          <select>
              <option value="aberto">Aberto</option>
              <option value="em-andamento">Em andamento</option>
              <option value="fechado">Fechado</option>
            </select>
        </label>

        <label>
          <p>Assunto</p>
          <input type="text-subject"  />
          </label>
          
          <label>Criticidade
          <select>
              <option value="baixa">Baixa</option>
              <option value="media">Média</option>
              <option value="alta">Alta</option>
            </select>
        </label>

        <label className="text-description">
          Descrição:
          <textarea/>
        </label>

        <label className="historic-actions">
          Histórico de Ações
          <textarea/>
          <ul>
            {}
          </ul>
        </label>
      </div>
    </div>
  );
};

export default Modal;