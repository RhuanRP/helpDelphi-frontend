import "./styles.css";
import editIcon from "../../assets/edit.svg";
import { TicketsQueryResponse } from "../../App";
import { formatDate } from "../../lib/utils";
import { redirect } from "react-router-dom";

export type TableProps = {
  data: TicketsQueryResponse | undefined;
};

const Table = ({ data }: TableProps) => {
  const handleEditClick = (itemId: string) => {
    console.log(itemId);
    redirect("/app/modal");
  };

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
                <td>{item.client}</td>
                <td>{item.criticality}</td>
                <td>{item.status}</td>
                <td>
                  <button onClick={() => handleEditClick(item.id)}>
                    <img className="edit-button" src={editIcon} alt="Editar" />
                  </button>
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
