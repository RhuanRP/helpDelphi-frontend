import { Button } from "../Button";
import "./styles.css";

interface TablePaginationProps {
  currentPage: number;
  totalCount: number;
  nextPage: () => void;
  previousPage: () => void;
}

export function TablePagination({
  totalCount,
  nextPage,
  previousPage,
  currentPage,
}: TablePaginationProps) {
  const qtdPages =
    totalCount % 10 == 0
      ? Math.floor(totalCount / 10)
      : Math.floor(totalCount / 10) + 1;

  return (
    <div className="pages-wrapper">
      <div>
        <span>
          Página {currentPage} de {qtdPages}
        </span>
      </div>
      <div className="buttons-pagination">
        <Button onClick={previousPage} disabled={currentPage === 1}>
          Anterior
        </Button>
        <Button onClick={nextPage} disabled={currentPage >= qtdPages}>
          Próxima
        </Button>
      </div>
    </div>
  );
}
