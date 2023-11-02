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
import { Input } from "../Form/Input";
import { Select } from "../Form/Select";
import { TextArea } from "../Form/TextArea";

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
      description: z
        .string()
        .min(1, { message: "A ação não pode estar vazia" }),
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
        <Dialog.Overlay className="DialogOverlay">
          <Dialog.Content className="DialogContent">
            <Dialog.Title className="DialogTitle">Chamado</Dialog.Title>
            <form
              onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
              className="form-wrapper"
            >
              <div className="double-input">
                <Input
                  name="client"
                  disabled
                  defaultValue={chamado.user.name}
                  label="Cliente"
                />
                <Select
                  label="Status"
                  name="status"
                  defaultValue={form.getValues("status")}
                  onChange={(e) => form.setValue("status", e.target.value)}
                >
                  <option value="waiting">Aguardando</option>
                  <option value="in_progress">Em andamento</option>
                  <option value="stopped">Pausado</option>
                  <option value="finished">Resolvido</option>
                </Select>
              </div>
              <div className="double-input">
                <Input
                  name="subject"
                  label="Assunto"
                  disabled
                  defaultValue={chamado.subject}
                />
                <Select
                  name="criticality"
                  label="Criticidade"
                  defaultValue={form.getValues("criticality")}
                  onChange={(e) => form.setValue("criticality", e.target.value)}
                >
                  <option value="low">Baixa</option>
                  <option value="medium">Média</option>
                  <option value="high">Alta</option>
                </Select>
              </div>

              <TextArea disabled name="description" label="Descrição" />

              <div className="actions-wrapper">
                <h2>Histórico de Ações</h2>
                {chamado.actions.map((action, index) => (
                  <TextArea
                    name={`action-${index}`}
                    label={`Ação ${index + 1}`}
                    key={index}
                    defaultValue={action.description}
                    disabled
                  />
                ))}
                {actions.fields.map((acao, index) => (
                  <>
                    <TextArea
                      key={acao.id}
                      {...form.register(`actions.${index}.description`)}
                      name={`actions.${index}.description`}
                      label={`Ação ${index + chamado.actions.length + 1}`}
                      required
                    />
                    <p>{form.formState.errors.actions?.[index]?.message}</p>
                  </>
                ))}
              </div>
              <div>
                <Button type="button" onClick={novaAcao}>
                  Adcionar
                </Button>
              </div>

              <div className="submit-buttons">
                <Button type="submit">Salvar</Button>
                <Button onClick={resetAndClose} type="button">
                  Cancelar
                </Button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
