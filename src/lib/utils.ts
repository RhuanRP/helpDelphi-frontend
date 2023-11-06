import { z } from "zod";
import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";

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

export function translateCriticality(criticality: number) {
  switch (criticality) {
    case 1:
      return "Baixa";
    case 2:
      return "Média";
    case 3:
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

export function verifyAuthToken(token: string) {
  const decodedToken = jwtDecode<{
    role: "technician" | "admin";
    sub: string;
    iat: number;
  }>(token);

  return decodedToken;
}
