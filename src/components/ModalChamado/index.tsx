import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "../Button";
import React from "react";
import "./styles.css";

type ModalChamadoProps = {
  chamado: {
    id: string;
    clientId: string;
    subject: string;
    criticality: string;
    status: string;
    createdAt: Date;
    updatedAt: Date | null;
    actions: {
      id: string;
      description: string;
      createdAt: Date;
      updatedAt: Date | null;
      ticketId: string;
    }[];
    user: {
      name: string;
    };
  };
};

export function ModalChamado({ chamado }: ModalChamadoProps) {
  const [isOpen, setOpen] = React.useState(false);

  function novaAcao() {
    console.log("implementar");
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button>Abrir</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">Chamado</Dialog.Title>
          <div className="modal-inputs">
            <div className="modal-left">
              <label>
                <p>Cliente</p>
                <input
                  type="text-client"
                  disabled
                  defaultValue={chamado.user.name}
                />
              </label>

              <label>
                <p>Assunto</p>
                <input
                  type="text-subject"
                  disabled
                  defaultValue={chamado.subject}
                />
              </label>
            </div>

            <div className="modal-right">
              <label>
                Status
                <select onChange={() => console.log("implementar")}>
                  <option value="aguardando">Aguardando</option>
                  <option value="em-andamento">Em andamento</option>
                  <option value="pausado">Pausado</option>
                  <option value="resolvido">Resolvido</option>
                </select>
              </label>
              <label>
                Criticidade
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
            <textarea disabled />
          </label>

          <label className="historic-actions">Histórico de Ações</label>
          <div className="border-actions">
            {chamado.actions.map((acao, index) => (
              <>
                <h2>{index}°Ação</h2>
                <textarea key={index}>{acao.description}</textarea>
              </>
            ))}
            <button className="add-button" onClick={novaAcao}>
              Adcionar
            </button>
          </div>
          <div className="button-action">
            <Button type="button">Salvar</Button>
            <Dialog.Close asChild>
              <Button type="button">Cancelar</Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
