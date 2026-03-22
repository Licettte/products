import { Header } from 'widgets/header'
import { Product } from 'widgets/product'

import styles from './Main.module.scss'

const Main = () => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <Product />
    </div>
  )
}
export default Main
