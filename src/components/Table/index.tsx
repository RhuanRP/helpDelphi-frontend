import "./app.css";

type TableProps = {
  // eslint-disable-next-line
  data: any[];
};

const Table = ({ data }: TableProps) => {
  return (
    <div className="call-table">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuário</th>
            <th>Número</th>
            <th>Data</th>
            <th>Cliente</th>
            <th>Assunto</th>
            <th>Criticidade</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.usuario}</td>
              <td>{item.numero}</td>
              <td>{item.data}</td>
              <td>{item.cliente}</td>
              <td>{item.assunto}</td>
              <td>{item.criticidade}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
