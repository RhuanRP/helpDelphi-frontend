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

const userSchema = z.object({
  name: z.string().toUpperCase(),
  company: z.string().toUpperCase(),
  email: z.string().email().toLowerCase(),
  document: z.string(),
  phone: z.string(),
  role: z.string(),
  username: z.string().toLowerCase(),
  password: z.string(),
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
              <Input {...form.register("name")} label="Nome" />
              <Input {...form.register("document")} label="CPF/CNPJ" />
            </div>
            <div className="double-input">
              <Input {...form.register("company")} label="Empresa" />
              <Input {...form.register("phone")} label="Telefone" />
            </div>
            <div className="double-input">
              <Input {...form.register("email")} label="Email" />
              <Select
                name="role"
                label="Tipo de Cadastro"
                defaultValue={form.getValues("role")}
                onChange={(e) => form.setValue("role", e.target.value)}
              >
                <option value="client">Cliente</option>
                <option value="technician">Tecnico</option>
                <option value="admin">Admin</option>
              </Select>
            </div>
            <div className="login-inputs">
              <Input {...form.register("username")} label="Login" />
              <Input
                type="password"
                {...form.register("password")}
                label="Senha "
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
