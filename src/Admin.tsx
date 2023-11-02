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
      <div className="view-admin">
        <form
          onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
          className="form-line"
        >
          <h1>Cadastro de usuário</h1>
          <div className="form-contents">
            <div className="form-inputs">
              <div className="form-left">
                <label>
                  <p>Nome</p>
                  <input {...form.register("name")} type="text-name" />
                </label>

                <label>
                  <p>Empresa</p>
                  <input {...form.register("company")} type="text-company" />
                </label>

                <label>
                  <p>Email</p>
                  <input {...form.register("email")} type="text-email" />
                </label>

                <br></br>
                <div className="login-center">
                  <label>
                    <p>Login</p>
                    <input {...form.register("username")} type="text-login" />
                  </label>
                </div>
              </div>

              <div className="form-right">
                <label>
                  <p>CPF/CNPJ</p>
                  <input {...form.register("document")} type="text-document" />
                </label>

                <label>
                  <p>Telefone</p>
                  <input {...form.register("phone")} type="text-tel" />
                </label>

                <label>
                  Tipo de cadastro
                  <select
                    defaultValue={form.getValues("role")}
                    onChange={(e) => form.setValue("role", e.target.value)}
                  >
                    <option value="client">Cliente</option>
                    <option value="technician">Tecnico</option>
                    <option value="admin">Admin</option>
                  </select>
                </label>
                <br></br>
                <div className="password-center"></div>
                <label>
                  <p>Senha</p>
                  <input type="password" {...form.register("password")} />
                </label>
              </div>
            </div>
          </div>

          <br></br>
          <div className="button-action">
            <Button type="submit">Salvar</Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Admin;
