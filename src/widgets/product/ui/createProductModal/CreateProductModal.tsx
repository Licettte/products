import { FormEvent, useState } from 'react'
import { Product } from 'shared/types'

import styles from './CreateProductModal.module.scss'

export type CreateProductFormValues = {
  title: string
  price: string
  brand: string
  sku: string
}

type CreateProductModalProps = {
  isOpen: boolean
  onClose: () => void
  onSubmit: (product: Product) => void
}

const initialForm: CreateProductFormValues = {
  title: '',
  price: '',
  brand: '',
  sku: '',
}

export const CreateProductModal = ({ isOpen, onClose, onSubmit }: CreateProductModalProps) => {
  const [form, setForm] = useState<CreateProductFormValues>(initialForm)
  const [errors, setErrors] = useState<Partial<CreateProductFormValues>>({})

  if (!isOpen) {
    return null
  }

  const handleChange = (field: keyof CreateProductFormValues, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }))

    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }))
  }

  const validate = () => {
    const nextErrors: Partial<CreateProductFormValues> = {}

    if (!form.title.trim()) {
      nextErrors.title = 'Введите наименование'
    }

    if (!form.price.trim()) {
      nextErrors.price = 'Введите цену'
    } else if (Number.isNaN(Number(form.price)) || Number(form.price) <= 0) {
      nextErrors.price = 'Цена должна быть больше 0'
    }

    if (!form.brand.trim()) {
      nextErrors.brand = 'Введите вендора'
    }

    if (!form.sku.trim()) {
      nextErrors.sku = 'Введите артикул'
    }

    setErrors(nextErrors)

    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!validate()) {
      return
    }

    const newProduct: Product = {
      img: '',
      title: '',
      price: 0,
      rating: 0,
      id: 0,
      discountPrice: 0,
    }

    onSubmit(newProduct)
    setForm(initialForm)
    setErrors({})
    onClose()
  }

  const handleCancel = () => {
    setForm(initialForm)
    setErrors({})
    onClose()
  }

  return (
    <div className={styles.overlay} onClick={handleCancel}>
      <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
        <div className={styles.header}>
          <h3 className={styles.title}>Добавить товар</h3>
          <button type="button" className={styles.closeButton} onClick={handleCancel}>
            ×
          </button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.field}>
            <span className={styles.label}>Наименование</span>
            <input
              value={form.title}
              onChange={(event) => handleChange('title', event.target.value)}
              className={styles.input}
            />
            {errors.title && <span className={styles.error}>{errors.title}</span>}
          </label>

          <label className={styles.field}>
            <span className={styles.label}>Цена</span>
            <input
              value={form.price}
              onChange={(event) => handleChange('price', event.target.value)}
              className={styles.input}
              inputMode="decimal"
            />
            {errors.price && <span className={styles.error}>{errors.price}</span>}
          </label>

          <label className={styles.field}>
            <span className={styles.label}>Вендор</span>
            <input
              value={form.brand}
              onChange={(event) => handleChange('brand', event.target.value)}
              className={styles.input}
            />
            {errors.brand && <span className={styles.error}>{errors.brand}</span>}
          </label>

          <label className={styles.field}>
            <span className={styles.label}>Артикул</span>
            <input
              value={form.sku}
              onChange={(event) => handleChange('sku', event.target.value)}
              className={styles.input}
            />
            {errors.sku && <span className={styles.error}>{errors.sku}</span>}
          </label>

          <div className={styles.actions}>
            <button type="button" className={styles.secondaryButton} onClick={handleCancel}>
              Отмена
            </button>
            <button type="submit" className={styles.primaryButton}>
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
