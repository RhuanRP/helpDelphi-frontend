import "./styles.css";
import { TicketsQueryResponse } from "../../App";
import {
  formatDate,
  translateCriticality,
  translateStatus,
} from "../../lib/utils";
import { ModalChamado } from "../ModalChamado";

export type TableProps = {
  data: TicketsQueryResponse | undefined;
};

const Table = ({ data }: TableProps) => {
  return (
    <table className="call-table">
      <thead>
        <tr>
          <th>Assunto</th>
          <th>Data</th>
          <th>Cliente</th>
          <th>Criticidade</th>
          <th>Status</th>
          <th>Editar</th>
        </tr>
      </thead>
      <tbody className="table-body">
        {data && (
          <>
            {data.items.map((item) => (
              <tr key={item.id}>
                <td>{item.subject}</td>
                <td>{formatDate(new Date(item.createdAt))}</td>
                <td>{item.user.name}</td>
                <td>{translateCriticality(item.criticality)}</td>
                <td>{translateStatus(item.status)}</td>
                <td>
                  <ModalChamado chamado={item} />
                </td>
              </tr>
            ))}
          </>
        )}
      </tbody>
    </table>
  );
};

export default Table;
