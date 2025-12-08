import { Button } from './Button'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant="secondary"
        size="sm"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Önceki
      </Button>
      
      <span className="text-sm">
        {currentPage} / {totalPages}
      </span>
      
      <Button
        variant="secondary"
        size="sm"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Sonraki
      </Button>
    </div>
  )
}
