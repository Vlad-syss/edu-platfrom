import { useEffect, useMemo, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { CATEGORIES, LEVELS } from '../data/courses';
import CourseCard from '../components/CourseCard';
import styles from './Home.module.css';

export default function Home() {
  const [sortBy, setSortBy] = useState('default');
  const [category, setCategory] = useState('all');
  const [level, setLevel] = useState('all');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchCourses() {
      setLoading(true);
      try {
        const snapshot = await getDocs(collection(db, 'courses'));
        setCourses(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCourses();
  }, []);

  const displayed = useMemo(() => {
    let list = [...courses];
    if (category !== 'all') list = list.filter((c) => c.category === category);
    if (level !== 'all') list = list.filter((c) => c.level === level);
    if (sortBy === 'asc') list.sort((a, b) => a.weeks - b.weeks);
    if (sortBy === 'desc') list.sort((a, b) => b.weeks - a.weeks);
    return list;
  }, [sortBy, category, level, courses]);

  return (
    <main>
      <section className={styles.hero}>
        <div className="container">
          <p className={styles.heroTag}>Платформа навчальних курсів</p>
          <h1 className={styles.heroTitle}>Навчайся.<br />Розвивайся.<br />Досягай.</h1>
          <p className={styles.heroSub}>Понад 120 курсів від провідних викладачів. Вчись у власному темпі — будь-де та будь-коли.</p>
          <div className={styles.heroStats}>
            <div className={styles.stat}><span className={styles.statNum}>120+</span><span className={styles.statLabel}>Курсів</span></div>
            <div className={styles.stat}><span className={styles.statNum}>45k</span><span className={styles.statLabel}>Студентів</span></div>
            <div className={styles.stat}><span className={styles.statNum}>98%</span><span className={styles.statLabel}>Задоволені</span></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Доступні курси</h2>
          <p className="section-sub">Оберіть курс відповідно до своїх цілей та рівня знань</p>

          <div className={styles.controls}>
            <div className={styles.selects}>
              <div className={styles.selectWrap}>
                <label>Категорія</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                  {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>
              <div className={styles.selectWrap}>
                <label>Рівень</label>
                <select value={level} onChange={(e) => setLevel(e.target.value)}>
                  {LEVELS.map((l) => <option key={l.value} value={l.value}>{l.label}</option>)}
                </select>
              </div>
            </div>

            <div className={styles.sortBtns}>
              <span className={styles.sortLabel}>Сортувати за тривалістю:</span>
              <button
                className={`${styles.sortBtn} ${sortBy === 'asc' ? styles.sortActive : ''}`}
                onClick={() => setSortBy(sortBy === 'asc' ? 'default' : 'asc')}
              >↑ Від коротких</button>
              <button
                className={`${styles.sortBtn} ${sortBy === 'desc' ? styles.sortActive : ''}`}
                onClick={() => setSortBy(sortBy === 'desc' ? 'default' : 'desc')}
              >↓ Від довгих</button>
            </div>
          </div>

          {loading ? (
            <p className={styles.empty}>Завантаження курсів…</p>
          ) : error ? (
            <p className={styles.empty}>Помилка завантаження: {error}</p>
          ) : displayed.length === 0 ? (
            <p className={styles.empty}>За вибраними фільтрами курсів не знайдено.</p>
          ) : (
            <div className={styles.grid}>
              {displayed.map((c) => <CourseCard key={c.id} course={c} />)}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
