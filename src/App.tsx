import "./styles/App.css";
import Table from "./components/Table";
import Header from "./components/Header";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "./lib/api";
import { verifyAuthToken } from "./lib/utils";
import { Input } from "./components/Form/Input";
import { useDebounce } from "./hooks/use-debounce";
import { TablePagination } from "./components/TablePagination";

export type TicketsQueryResponse = {
  items: {
    id: string;
    clientId: string;
    subject: string;
    criticality: number;
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
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search);
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["chamados", debouncedSearch, page],
    queryFn: async () => {
      return api
        .get<TicketsQueryResponse>(
          `/tickets?page=${page}&search=${debouncedSearch.toUpperCase()}`,
        )
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
      <div className="container data-wrapper">
        <Input
          name="search"
          label=""
          placeholder="Pesquisar pelo título"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Table data={data} />
        {data && (
          <TablePagination
            currentPage={page}
            nextPage={() => setPage(page + 1)}
            previousPage={() => setPage(page - 1)}
            totalCount={data.totalCount}
          />
        )}
      </div>
    </>
  );
}

export default App;
