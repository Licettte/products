import { Outlet } from 'react-router-dom'

import styles from './Layout.module.scss'

export const Layout = () => {
  return (
    <div className={styles.app}>
      <header className={styles.header}></header>

      <main className={styles.main} role="main">
        <Outlet />
      </main>

      <footer className={styles.footer}></footer>
    </div>
  )
}
