import styles from './app.module.css';
import { AppHeader } from '../app-header';
import { Outlet } from 'react-router-dom';

export const Layout = () => (
  <div className={styles.app}>
    <AppHeader />
    <Outlet />
  </div>
);
