const Pagination = ({
  page,
  totalPages,
  total,
  limit,
  setPage,
  setLimit
}) => {
  const hasNextPage = page < totalPages
  const hasPrevPage = page > 1

  const handleNext = () => {
    if (hasNextPage) setPage(page + 1)
  }

  const handlePrev = () => {
    if (hasPrevPage) setPage(page - 1)
  }

  const handleLimitChange = (e) => {
    setLimit(parseInt(e.target.value))
    setPage(1)
  }

  return (
    <>
      <div className="gallery-controls">
        <div className="items-per-page">
          <label>Items per page:</label>
          <select value={limit} onChange={handleLimitChange}>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={25}>25</option>
          </select>
        </div>

        <div className="pagination-info">
          Page {page} of {totalPages} ({total} total)
        </div>
      </div>

      <div className="pagination-controls">
        <button onClick={handlePrev} disabled={!hasPrevPage}>
          ← Previous
        </button>

        <div className="page-indicator">
          {page} / {totalPages}
        </div>

        <button onClick={handleNext} disabled={!hasNextPage}>
          Next →
        </button>
      </div>
    </>
  )
}

export default Pagination