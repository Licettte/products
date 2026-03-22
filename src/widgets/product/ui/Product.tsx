import { useState } from 'react'
import ArrowsClockwiseIcon from 'shared/assets/ArrowsClockwiseIcon.svg?react'
import PlusIcon from 'shared/assets/PlusIcon.svg?react'
import { ColorButton, IconButton } from 'shared/ui/button'
import { Flex } from 'shared/ui/flex/Flex'
import { Toast } from 'shared/ui/toast/Toast'
import { useToast } from 'shared/ui/toast/useToast'
import { Pagination } from 'widgets/pagination'
import { useProductsPage } from 'widgets/product/model/useProductsPage'
import { ProductsTable } from 'widgets/product/table/ui/ProductsTable'
import { CreateProductModal } from 'widgets/product/ui/createProductModal/CreateProductModal'
import { ProgressBar } from 'widgets/progressBar'

import styles from './Product.module.scss'

export const Product = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const { items, total, isLoading, error, currentPage, totalPages, range, changePage, refresh } =
    useProductsPage()

  const { toastMessage, isToastVisible, showToast } = useToast()

  const handleCreateProduct = () => {
    showToast('Товар успешно добавлен')
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <Flex justify="space-between">
          <h4>Все позиции</h4>

          <Flex gap={8}>
            <IconButton Icon={ArrowsClockwiseIcon} onClick={refresh} />

            <ColorButton
              width={147}
              height={40}
              radius={6}
              className={styles.colorButton}
              onClick={() => setIsCreateModalOpen(true)}
            >
              <span className={styles.circle}>
                <PlusIcon />
              </span>
              <span className={styles.add}>Добавить</span>
            </ColorButton>
          </Flex>
        </Flex>

        <div className={styles.tableWrapper}>
          {isLoading && <ProgressBar />}

          {error ? <div className={styles.error}>{error}</div> : <ProductsTable products={items} />}
        </div>

        <Flex align="center" justify="space-between" className={styles.pagination}>
          <div className={styles.info}>
            {total > 0 ? `Показано ${range.from}-${range.to} из ${total}` : 'Нет данных'}
          </div>

          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={changePage} />
        </Flex>
      </div>

      <CreateProductModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateProduct}
      />

      <Toast message={toastMessage} isVisible={isToastVisible} />
    </div>
  )
}
