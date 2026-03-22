import { setSearch } from 'entities/product/model/productsSlice'
import { selectProductsSearch } from 'entities/product/model/selectors'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks/typedRedux'
import { useDebouncedValue } from 'shared/lib/hooks/useDebouncedValue'
import { SearchInput } from 'shared/ui/searchInput'

import styles from './Header.module.scss'

export const Header = () => {
  const dispatch = useAppDispatch()
  const searchFromStore = useAppSelector(selectProductsSearch)

  const [inputValue, setInputValue] = useState(searchFromStore)
  const debouncedValue = useDebouncedValue(inputValue, 300)

  useEffect(() => {
    if (debouncedValue === searchFromStore) {
      return
    }

    dispatch(setSearch(debouncedValue))
  }, [debouncedValue, searchFromStore, dispatch])

  const handleClear = () => {
    setInputValue('')
    dispatch(setSearch(''))
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h3 className={styles.title}>Товары</h3>

        <div className={styles.search}>
          <SearchInput value={inputValue} onChangeValue={setInputValue} onClear={handleClear} />
        </div>
      </div>
    </div>
  )
}
