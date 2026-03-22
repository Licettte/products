import styles from './HeaderCell.module.scss'

type HeaderCellProps = {
  title: string
}

export const HeaderCell = ({ title }: HeaderCellProps) => {
  return <span className={styles.text}>{title}</span>
}
