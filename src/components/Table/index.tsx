import "./styles.css";
import editIcon from "../../assets/edit.png";
import "./modal.css";

export type TableProps = {
  data: {
    id: string;
    clientId: string;
    subject: string;
    criticality: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
};

const Table = ({ data }: TableProps) => {
  const handleEditClick = (itemId: string) => {
    console.log(itemId);
    //logica do botão (fazer depois).
  };

  return (
    <table className="call-table">
      <thead>
        <tr>
          <th>N°</th>
          <th>Data</th>
          <th>Cliente</th>
          <th>Assunto</th>
          <th>Criticidade</th>
          <th>Status</th>
          <th>Editar</th>
        </tr>
      </thead>
      <tbody className="table-body">
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{String(item.createdAt)}</td>
            <td>{item.clientId}</td>
            <td>{item.subject}</td>
            <td>{item.criticality}</td>
            <td>{item.status}</td>
            <td>
              <button onClick={() => handleEditClick(item.id)}>
                <img className="edit-button" src={editIcon} alt="Editar" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;