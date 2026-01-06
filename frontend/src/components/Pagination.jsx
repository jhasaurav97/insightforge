const Pagination = ({ page, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center gap-2 mt-6">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="px-3 py-1 rounded border disabled:opacity-50"
      >
        Prev
      </button>

      <span className="px-3 py-1">
        Page {page} of {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="px-3 py-1 rounded border disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
