import styles from "./Pagination.module.css";

const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  setCurrentPage,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getPageNumbers = () => {
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + 4);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <div className={styles.pagination}>
      <button
        className={styles.pageBtn}
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      {getPageNumbers().map((num) => (
        <button
          key={num}
          className={`${styles.pageNumber} ${
            num === currentPage ? styles.active : ""
          }`}
          onClick={() => setCurrentPage(num)}
        >
          {num}
        </button>
      ))}

      <button
        className={styles.pageBtn}
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
