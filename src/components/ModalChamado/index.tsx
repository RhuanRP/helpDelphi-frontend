import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "../Button";
import React from "react";
import "./styles.css";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/api";
import { Input } from "../Form/Input";
import { Select } from "../Form/Select";
import { TextArea } from "../Form/TextArea";
import { Icons } from "../Icons";
import { toast } from "sonner";
import { catchError } from "../../lib/utils";

type ModalChamadoProps = {
  chamado: {
    id: string;
    clientId: string;
    subject: string;
    criticality: number;
    status: string;
    description: string;
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
  criticality: z.number(),
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

  const mutation = useMutation({
    mutationFn: async (data: Input) => {
      return api.patch(`/tickets/${chamado.id}`, data);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["chamados"],
      });
      setOpen(false);
      toast.success("Chamado editado com sucesso");
    },
    onError: (err) => {
      catchError(err);
    },
  });

  function onSubmit(data: Input) {
    if (
      chamado.status !== "stopped" &&
      data.status === "stopped" &&
      data.actions.length < 1
    ) {
      form.setError("status", {
        type: "validate",
        message: "É preciso fornecer uma ação justificando a pausa do chamado.",
      });

      return;
    }

    mutation.mutate(data);
  }

  React.useEffect(() => {
    form.reset({
      actions: [],
      criticality: chamado.criticality,
      status: chamado.status,
    });
  }, [isOpen, form, chamado]);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button data-testid="open-modal">
          <Icons.edit color="#ffffff" />
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
                  error={form.formState.errors.status}
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
                  error={form.formState.errors.criticality}
                  defaultValue={form.getValues("criticality")}
                  onChange={(e) =>
                    form.setValue("criticality", Number(e.target.value))
                  }
                >
                  <option value="1">Baixa</option>
                  <option value="2">Média</option>
                  <option value="3">Alta</option>
                </Select>
              </div>

              <TextArea
                disabled
                defaultValue={chamado.description}
                name="description"
                label="Descrição"
              />

              <div className="actions-wrapper">
                <h2>Histórico de Ações</h2>
                {chamado.actions.map((action, index) => (
                  <TextArea
                    name={`action-${index}`}
                    label={`Ação ${index + 1}`}
                    key={`existent-${index}`}
                    defaultValue={action.description}
                    disabled
                  />
                ))}
                {actions.fields.map((acao, index) => (
                  <TextArea
                    key={acao.id}
                    {...form.register(`actions.${index}.description`)}
                    name={`actions.${index}.description`}
                    error={
                      form.formState.errors.actions
                        ? form.formState.errors.actions[index]?.description
                        : undefined
                    }
                    label={`Ação ${index + chamado.actions.length + 1}`}
                  />
                ))}
              </div>
              <div>
                <Button type="button" onClick={novaAcao}>
                  Adcionar
                </Button>
              </div>

              <div className="submit-buttons">
                <Button disabled={mutation.isPending} type="submit">
                  {mutation.isPending && (
                    <Icons.spinner className="loader-icon" />
                  )}
                  Salvar
                </Button>
                <Dialog.Close asChild>
                  <Button type="button">Cancelar</Button>
                </Dialog.Close>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
