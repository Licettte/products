import { useEffect, useMemo, useState } from 'react'

import {
  buildPages,
  getMaxStartPage,
  getPagesCount,
  normalizePage,
} from '../lib/utils'

type UsePaginationParams = {
  currentPage: number
  totalPages: number
  visiblePages: number
  onPageChange: (page: number) => void
}

export const usePagination = ({
                                currentPage,
                                totalPages,
                                visiblePages,
                                onPageChange,
                              }: UsePaginationParams) => {

  const pagesCount = getPagesCount(visiblePages, totalPages)
  const maxStartPage = getMaxStartPage(pagesCount, totalPages)
  const safeCurrentPage = normalizePage(currentPage, totalPages)

  const [startPage, setStartPage] = useState(1)

  useEffect(() => {
    if (totalPages <= 1) {
      return
    }

    setStartPage((prev) => Math.min(Math.max(prev, 1), maxStartPage))
  }, [maxStartPage, totalPages])

  const endPage = startPage + pagesCount - 1

  const pages = useMemo(() => {
    return buildPages(startPage, endPage)
  }, [startPage, endPage])

  const goToPage = (page: number) => {
    const nextPage = normalizePage(page, totalPages)

    if (nextPage === safeCurrentPage) {
      return
    }

    onPageChange(nextPage)
  }

  const handlePrevClick = () => {
    if (safeCurrentPage === 1) {
      return
    }

    const nextPage = safeCurrentPage - 1

    if (nextPage < startPage) {
      setStartPage(Math.max(1, startPage - visiblePages))
    }

    onPageChange(nextPage)
  }

  const handleNextClick = () => {
    if (safeCurrentPage === totalPages) {
      return
    }

    const nextPage = safeCurrentPage + 1

    if (nextPage > endPage) {
      setStartPage(Math.min(startPage + visiblePages, maxStartPage))
    }

    onPageChange(nextPage)
  }

  return {
    pages,
    safeCurrentPage,
    isPrevDisabled: safeCurrentPage === 1,
    isNextDisabled: safeCurrentPage === totalPages,
    goToPage,
    handlePrevClick,
    handleNextClick,
  }
}
