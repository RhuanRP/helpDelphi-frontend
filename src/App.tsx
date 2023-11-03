import "./styles/App.css";
import Table from "./components/Table";
import Header from "./components/Header";
import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "./lib/api";
import { verifyAuthToken } from "./lib/utils";

export type TicketsQueryResponse = {
  items: {
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
  }[];
  totalCount: number;
};

function App() {
  const [cookies] = useCookies(["helpdelphi_api_token"]);
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["chamados"],
    queryFn: async () => {
      return api
        .get<TicketsQueryResponse>("/tickets?page=1")
        .then((res) => res.data);
    },
  });

  React.useEffect(() => {
    if (typeof cookies.helpdelphi_api_token !== "string") {
      navigate("/login");
    }

    const decodedToken = verifyAuthToken(cookies.helpdelphi_api_token);

    if (decodedToken.role === "admin") {
      navigate("/admin");
    }
  }, [cookies, navigate]);

  return (
    <>
      <Header />
      <div className="container">
        <Table data={data} />
      </div>
    </>
  );
}

export default App;
