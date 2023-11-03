import logo from "./assets/logo.png";
import { Button } from "./components/Button";
import "./styles/Login.css";
import { Input } from "./components/Form/Input";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { authSchema } from "./lib/validations/authSchema";
import { api } from "./lib/api";
import { useAuth } from "./hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import React from "react";
import { catchError } from "./lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icons } from "./components/Icons";

type Input = z.infer<typeof authSchema>;

type SignInResponse = {
  user: {
    username: string;
    role: "admin" | "client" | "technician";
  };
  token: string;
};

const Login = () => {
  const form = useForm<Input>({
    resolver: zodResolver(authSchema),
  });
  const { signIn } = useAuth();
  const [cookies] = useCookies(["helpdelphi_api_token"]);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (input: Input) => {
      const { data } = await api.post<SignInResponse>("/users/session", input);
      return data;
    },
    onSuccess: async (data) => {
      try {
        await signIn({
          username: data.user.username,
          token: data.token,
          role: data.user.role,
        });
      } catch (error) {
        catchError(error);
      }
    },
    onError: () => {
      catchError(new Error("Usuário ou senha incorretos"));
    },
  });

  function onSubmit(data: Input) {
    mutation.mutate(data);
  }

  React.useEffect(() => {
    if (typeof cookies.helpdelphi_api_token === "string") {
      navigate("/");
    }
  }, [cookies, navigate]);

  return (
    <div className="tela-login">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <h2>
        <span className="help-text">Help</span>
        <span className="delphi-text">Delphi</span>
      </h2>
      <form onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}>
        <Input
          label="Usuário"
          {...form.register("username")}
          error={form.formState.errors.username}
        />
        <Input
          type="password"
          label="Senha"
          {...form.register("password")}
          error={form.formState.errors.password}
        />
        <div className="button-container">
          <Button
            disabled={mutation.isPending || mutation.isSuccess}
            type="submit"
          >
            {mutation.isPending && <Icons.spinner className="loader-icon" />}
            Acessar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
