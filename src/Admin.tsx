import "./styles/Admin.css";
import { Button } from "./components/Button";
import Header from "./components/Header";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { api } from "./lib/api";
import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { verifyAuthToken } from "./lib/utils";
import { Input } from "./components/Form/Input";
import { Select } from "./components/Form/Select";
import { toast } from "sonner";

const userSchema = z.object({
  name: z
    .string()
    .min(1, { message: "O campo não pode estar vazio" })
    .toUpperCase(),
  company: z
    .string()
    .min(1, { message: "O campo não pode estar vazio" })
    .toUpperCase(),
  email: z.string().email({ message: "Digite um email válido" }).toLowerCase(),
  document: z.string().length(11, { message: "Digite um CPF válido" }),
  phone: z
    .string()
    .length(11, { message: "Digite um número de celular válido" }),
  role: z.string().min(1, { message: "O campo não pode estar vazio" }),
  username: z
    .string()
    .min(1, { message: "O campo não pode estar vazio" })
    .toLowerCase(),
  password: z
    .string()
    .min(3, { message: "A senha deve conter no mínimo três dígitos" }),
});

type Input = z.infer<typeof userSchema>;

function Admin() {
  const [cookies] = useCookies(["helpdelphi_api_token"]);
  const navigate = useNavigate();

  const form = useForm<Input>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      role: "client",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: Input) => {
      await api.post("/users", data);
    },
    onSuccess: () => {
      form.reset();
      toast.success("Usuário cadastrado com sucesso!");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  function onSubmit(data: Input) {
    mutation.mutate(data);
  }

  React.useEffect(() => {
    if (typeof cookies.helpdelphi_api_token !== "string") {
      navigate("/login");
    }

    const decodedToken = verifyAuthToken(cookies.helpdelphi_api_token);

    if (decodedToken.role === "technician") {
      navigate("/");
    }
  }, [cookies, navigate]);

  return (
    <>
      <Header />
      <div className="user-container">
        <div className="form-wrapper">
          <h1 className="form-title">Cadastro de usuário</h1>
          <form
            onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
            className="form-user"
          >
            <div className="double-input">
              <Input
                {...form.register("name")}
                label="Nome"
                error={form.formState.errors.name}
              />
              <Input
                {...form.register("document")}
                label="CPF/CNPJ"
                error={form.formState.errors.document}
              />
            </div>
            <div className="double-input">
              <Input
                {...form.register("company")}
                label="Empresa"
                error={form.formState.errors.company}
              />
              <Input
                {...form.register("phone")}
                label="Telefone"
                error={form.formState.errors.phone}
              />
            </div>
            <div className="double-input">
              <Input
                {...form.register("email")}
                label="Email"
                error={form.formState.errors.email}
              />
              <Select
                name="role"
                label="Tipo de Cadastro"
                defaultValue={form.getValues("role")}
                onChange={(e) => form.setValue("role", e.target.value)}
                error={form.formState.errors.role}
              >
                <option value="client">Cliente</option>
                <option value="technician">Tecnico</option>
                <option value="admin">Admin</option>
              </Select>
            </div>
            <div className="login-inputs">
              <Input
                {...form.register("username")}
                label="Login"
                error={form.formState.errors.username}
              />
              <Input
                type="password"
                {...form.register("password")}
                label="Senha "
                error={form.formState.errors.password}
              />
            </div>
            <div className="submit-buttons">
              <Button type="submit">Salvar</Button>
              <Button type="button" onClick={() => form.reset()}>
                Cancelar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Admin;
