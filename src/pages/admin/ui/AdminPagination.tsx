import styles from '../AdminPage.module.scss'

interface AdminPaginationProps {
  page: number
  pageSize: number
  totalPages: number
  totalElements: number
  onPageChange: (page: number) => void
  onPageSizeChange: (pageSize: number) => void
}

export const AdminPagination = ({
  page,
  pageSize,
  totalPages,
  totalElements,
  onPageChange,
  onPageSizeChange,
}: AdminPaginationProps) => {
  const pageCount = Math.max(totalPages, 1)

  return (
    <div className={styles.pagination}>
      <span>전체 {totalElements.toLocaleString()}건</span>
      <div>
        <button
          type='button'
          disabled={page <= 0}
          onClick={() => onPageChange(Math.max(page - 1, 0))}
        >
          ‹
        </button>
        {Array.from({ length: pageCount }, (_, index) => index)
          .slice(Math.max(page - 2, 0), Math.max(page - 2, 0) + 5)
          .map((pageNumber) => (
            <button
              key={pageNumber}
              type='button'
              className={pageNumber === page ? styles.activePage : ''}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber + 1}
            </button>
          ))}
        <button
          type='button'
          disabled={page >= pageCount - 1}
          onClick={() => onPageChange(Math.min(page + 1, pageCount - 1))}
        >
          ›
        </button>
      </div>
      <select
        value={pageSize}
        onChange={(event) => {
          onPageSizeChange(Number(event.target.value))
          onPageChange(0)
        }}
      >
        <option value='10'>10개씩 보기</option>
        <option value='20'>20개씩 보기</option>
      </select>
    </div>
  )
}
