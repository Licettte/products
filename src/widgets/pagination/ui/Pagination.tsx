import LeftIcon from 'shared/assets/LeftIcon.svg?react'
import RightIcon from 'shared/assets/RightIcon.svg?react'
import { ColorButton, IconButton } from 'shared/ui/button'
import { Flex } from 'shared/ui/flex/Flex'

import { usePagination } from '../model/usePagination'
import styles from './Pagination.module.scss'

type PaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  visiblePages?: number
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  visiblePages = 5,
}: PaginationProps) => {
  const {
    pages,
    safeCurrentPage,
    isPrevDisabled,
    isNextDisabled,
    goToPage,
    handlePrevClick,
    handleNextClick,
  } = usePagination({
    currentPage,
    totalPages,
    visiblePages,
    onPageChange,
  })

  if (totalPages <= 1) {
    return null
  }

  return (
    <Flex justify="space-between" align="center">
      <Flex align="center" gap={8}>
        <IconButton
          Icon={LeftIcon}
          onClick={handlePrevClick}
          disabled={isPrevDisabled}
          className={styles.arrowButton}
          iconClassName={styles.arrowIcon}
        />

        <Flex align="center" gap={8}>
          {pages.map((page) => {
            const isCurrentPage = page === safeCurrentPage

            return (
              <ColorButton
                key={page}
                variant={isCurrentPage ? 'secondary' : 'light'}
                radius={4}
                width={30}
                height={30}
                onClick={() => goToPage(page)}
                className={isCurrentPage ? undefined : styles.colorButton}
              >
                {page}
              </ColorButton>
            )
          })}
        </Flex>

        <IconButton
          Icon={RightIcon}
          onClick={handleNextClick}
          disabled={isNextDisabled}
          className={styles.arrowButton}
          iconClassName={styles.arrowIcon}
        />
      </Flex>
    </Flex>
  )
}
