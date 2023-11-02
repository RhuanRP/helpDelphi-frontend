import "./styles/app.css";
import Table from "./components/Table";
import Header from "./components/Header";
import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "./lib/api";

export type TicketsQueryResponse = {
  items: {
    id: string;
    subject: string;
    client: string;
    status: string;
    createdAt: Date;
    updatedAt: Date | null;
    criticality: string;
  }[];
  totalCount: number;
};

function App() {
  const [cookies] = useCookies(["helpdelphi_api_token"]);
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["chamados"],
    queryFn: async () => {
      const { data } = await api.get<TicketsQueryResponse>("/tickets?page=1");
      return data;
    },
  });

  React.useEffect(() => {
    if (typeof cookies.helpdelphi_api_token !== "string") {
      navigate("/login");
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
