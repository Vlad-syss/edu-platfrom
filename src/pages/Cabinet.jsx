import ProgressBlock from '../components/ProgressBlock';
import styles from './Cabinet.module.css';

const active = [
  { label: 'Python для початківців',        pct: 75, color: 'linear-gradient(90deg,#667eea,#764ba2)' },
  { label: 'HTML, CSS та адаптивний дизайн', pct: 40, color: 'linear-gradient(90deg,#4facfe,#00f2fe)' },
  { label: 'UI/UX Дизайн',                   pct: 10, color: 'linear-gradient(90deg,#f093fb,#f5576c)' },
];

const completed = [
  '✅ Основи комп\'ютерної грамотності',
  '✅ Вступ до програмування',
  '✅ Git та GitHub для початківців',
];

export default function Cabinet() {
  return (
    <main className="section">
      <div className="container">
        <h2 className="section-title">Мій кабінет</h2>
        <p className="section-sub">Відстежуй свій прогрес та досягнення</p>

        <div className={styles.layout}>
          <aside className={styles.profile}>
            <div className={styles.avatar}>👤</div>
            <h3 className={styles.name}>Іван Студентенко</h3>
            <p className={styles.email}>ivan@example.com</p>
            <div className={styles.achievements}>
              <span className={styles.ach}>🏆 Топ студент</span>
              <span className={styles.ach}>🔥 7 днів поспіль</span>
              <span className={styles.ach}>📚 3 курси завершено</span>
            </div>
          </aside>

          <div className={styles.main}>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Активні курси</h3>
              {active.map((a, i) => <ProgressBlock key={i} label={a.label} pct={a.pct} color={a.color} />)}
            </div>

            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Завершені курси</h3>
              <ul className={styles.completedList}>
                {completed.map((c, i) => <li key={i} className={styles.completedItem}>{c}</li>)}
              </ul>
            </div>

            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Сертифікати</h3>
              <div className={styles.certs}>
                <div className={styles.cert}>🎓 Основи комп'ютерної грамотності</div>
                <div className={styles.cert}>🎓 Вступ до програмування</div>
                <div className={styles.cert}>🎓 Git та GitHub</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
