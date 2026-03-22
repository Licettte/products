import styles from './Toast.module.scss'

type ToastProps = {
  message: string
  isVisible: boolean
}

export const Toast = ({ message, isVisible }: ToastProps) => {
  if (!isVisible) {
    return null
  }

  return <div className={styles.toast}>{message}</div>
}
