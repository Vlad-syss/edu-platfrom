import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import ScheduleRow from '../components/ScheduleRow';
import styles from './Schedule.module.css';

export default function Schedule() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchSchedule() {
      setLoading(true);
      try {
        const snap = await getDocs(collection(db, 'schedule'));
        setRows(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchSchedule();
  }, []);

  return (
    <main className="section">
      <div className="container">
        <h2 className="section-title">Розклад занять</h2>
        <p className="section-sub">Найближчі заняття цього тижня</p>

        {loading ? (
          <p className={styles.empty}>Завантаження розкладу…</p>
        ) : error ? (
          <p className={styles.empty}>Помилка завантаження: {error}</p>
        ) : rows.length === 0 ? (
          <p className={styles.empty}>Розклад поки порожній.</p>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>День</th>
                  <th>Час</th>
                  <th>Курс</th>
                  <th>Викладач</th>
                  <th>Формат</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => <ScheduleRow key={row.id} row={row} index={i} />)}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
