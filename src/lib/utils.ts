import { z } from "zod";
import { toast } from "sonner";

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "short" }).format(date);
}

export function translateStatus(status: string) {
  switch (status) {
    case "waiting":
      return "Aguardando";
    case "in_progress":
      return "Em Andamento";
    case "stopped":
      return "Pausado";
    case "finished":
      return "Finalizado";
    default:
      return "";
  }
}

export function translateCriticality(criticality: string) {
  switch (criticality) {
    case "low":
      return "Baixa";
    case "medium":
      return "Média";
    case "high":
      return "Alta";
    default:
      "";
  }
}

export function catchError(err: unknown) {
  if (err instanceof z.ZodError) {
    const errors = err.issues.map((issue) => {
      return issue.message;
    });
    return toast.error(errors.join("\n"));
  } else if (err instanceof Error) {
    return toast.error(err.message);
  } else {
    return toast.error("Something went wrong, please try again later.");
  }
}
