export const normalizePage = (page: number, totalPages: number): number => {
  if (totalPages <= 0) {
    return 1
  }

  return Math.min(Math.max(page, 1), totalPages)
}

export const getPagesCount = (visiblePages: number, totalPages: number): number => {
  return Math.min(visiblePages, totalPages)
}

export const getMaxStartPage = (pagesCount: number, totalPages: number): number => {
  return Math.max(1, totalPages - pagesCount + 1)
}

export const buildPages = (startPage: number, endPage: number): number[] => {
  const pages: number[] = []

  for (let page = startPage; page <= endPage; page += 1) {
    pages.push(page)
  }

  return pages
}
