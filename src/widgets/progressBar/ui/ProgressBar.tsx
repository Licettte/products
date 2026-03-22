import styles from './ProgressBar.module.scss'

export const ProgressBar = () => {
  return (
    <div className={styles.wrapper} aria-hidden="true">
      <div className={styles.bar} />
    </div>
  )
}
