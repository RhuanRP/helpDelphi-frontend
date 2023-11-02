import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "../Button";
import React from "react";
import "./styles.css";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/api";
import { Pencil } from "lucide-react";

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

const chamadoFormSchema = z.object({
  status: z.string(),
  criticality: z.string(),
  actions: z
    .object({
      description: z.string(),
    })
    .array(),
});

type Input = z.infer<typeof chamadoFormSchema>;

export function ModalChamado({ chamado }: ModalChamadoProps) {
  const queryClient = useQueryClient();
  const [isOpen, setOpen] = React.useState(false);
  const form = useForm<Input>({
    resolver: zodResolver(chamadoFormSchema),
    defaultValues: {
      criticality: chamado.criticality,
      status: chamado.status,
      actions: [],
    },
  });
  const actions = useFieldArray({
    control: form.control,
    name: "actions",
  });

  function novaAcao() {
    actions.append({
      description: "",
    });
  }

  function resetAndClose() {
    form.reset();
    setOpen(false);
  }

  const mutation = useMutation({
    mutationFn: async (data: Input) => {
      await api.patch(`/tickets/${chamado.id}`, data);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["chamados"],
      });
      resetAndClose();
    },
    onError: (err) => {
      console.log(err);
    },
  });

  function onSubmit(data: Input) {
    mutation.mutate(data);
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button>
          <Pencil />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">Chamado</Dialog.Title>
          <form
            onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
          >
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
                  <select
                    defaultValue={form.getValues("status")}
                    onChange={(e) => form.setValue("status", e.target.value)}
                  >
                    <option value="waiting">Aguardando</option>
                    <option value="in_progress">Em andamento</option>
                    <option value="stopped">Pausado</option>
                    <option value="finished">Resolvido</option>
                  </select>
                </label>
                <label>
                  Criticidade
                  <select
                    defaultValue={form.getValues("criticality")}
                    onChange={(e) =>
                      form.setValue("criticality", e.target.value)
                    }
                  >
                    <option value="low">Baixa</option>
                    <option value="medium">Média</option>
                    <option value="high">Alta</option>
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
              {chamado.actions.map((action, index) => (
                <>
                  <p>Ação {index + 1}</p>
                  <textarea
                    key={index}
                    defaultValue={action.description}
                    disabled
                  />
                </>
              ))}
              {actions.fields.map((acao, index) => (
                <>
                  <p>Ação {index + chamado.actions.length + 1}</p>
                  <textarea
                    {...form.register(`actions.${index}.description`)}
                    key={acao.id}
                  />
                  <p>{form.formState.errors.actions?.message}</p>
                </>
              ))}
              <button className="add-button" type="button" onClick={novaAcao}>
                Adcionar
              </button>
            </div>
            <div className="button-action">
              <Button type="submit">Salvar</Button>
              <Button onClick={resetAndClose} type="button">
                Cancelar
              </Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
