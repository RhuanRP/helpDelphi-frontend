import { FormEvent } from "react";
import logo from "./assets/logo.png";
import { Button } from "./components/Button";
import "./styles/login.css";
import { Input } from "./components/Input";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { authSchema } from "./lib/validations/authSchema";
import { api } from "./lib/api";
import { useAuth } from "./hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import React from "react";
import { catchError } from "./lib/utils";

type Input = z.infer<typeof authSchema>;

type SignInResponse = {
  user: {
    username: string;
    role: "admin" | "client" | "technician";
  };
  token: string;
};

const Login = () => {
  const [user, setUser] = React.useState("");
  const [password, setPassword] = React.useState("");
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
    onError: (err) => {
      console.log(err);
    },
  });

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    mutation.mutate({
      username: user,
      password,
    });
  }

  React.useEffect(() => {
    if (typeof cookies.helpdelphi_api_token === "string") {
      navigate("/app");
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
      <form onSubmit={onSubmit}>
        <div className="form-item">
          <label>Usuário</label>
          <Input
            type="user"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </div>
        <div className="form-item">
          <label>Senha</label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="button-container">
          <Button type="submit">Acessar</Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
