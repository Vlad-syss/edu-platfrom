import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate('/');
  }

  const linkClass = ({ isActive }) =>
    isActive ? `${styles.link} ${styles.active}` : styles.link;

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <NavLink to="/" className={styles.logo}>
          <span className={styles.logoIcon}>📚</span>
          <span className={styles.logoText}>EduPlatform</span>
        </NavLink>
        <nav className={styles.nav}>
          <NavLink to="/" className={linkClass} end>Курси</NavLink>
          <NavLink to="/schedule" className={linkClass}>Розклад</NavLink>
          <NavLink to="/cabinet" className={linkClass}>Мій кабінет</NavLink>
          <NavLink to="/about" className={linkClass}>Про нас</NavLink>
        </nav>
        <div className={styles.auth}>
          {user ? (
            <>
              <span className={styles.email}>{user.email}</span>
              <button onClick={handleLogout} className={styles.logout}>Вийти</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={styles.loginLink}>Увійти</NavLink>
              <NavLink to="/register" className={styles.registerBtn}>Реєстрація</NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
