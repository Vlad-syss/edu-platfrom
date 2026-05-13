import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import styles from './Auth.module.css';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (password !== confirm) {
      setError('Паролі не співпадають');
      return;
    }
    setBusy(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/cabinet', { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="section">
      <div className="container">
        <div className={styles.wrap}>
          <h2 className="section-title">Реєстрація</h2>
          <p className="section-sub">Створіть акаунт, щоб отримати доступ до курсів</p>
          <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.field}>
              <span>Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </label>
            <label className={styles.field}>
              <span>Пароль</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
                minLength={6}
              />
            </label>
            <label className={styles.field}>
              <span>Підтвердження пароля</span>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                autoComplete="new-password"
                minLength={6}
              />
            </label>
            {error && <p className={styles.error}>{error}</p>}
            <button type="submit" className={styles.submit} disabled={busy}>
              {busy ? 'Створення…' : 'Зареєструватися'}
            </button>
            <p className={styles.hint}>
              Вже маєте акаунт? <Link to="/login">Увійти</Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
