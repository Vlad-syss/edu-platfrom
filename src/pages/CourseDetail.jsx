import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { fetchReviews } from '../api';
import ReviewForm from '../components/ReviewForm';
import styles from './CourseDetail.module.css';

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewsError, setReviewsError] = useState('');

  const loadReviews = useCallback(async () => {
    try {
      const data = await fetchReviews(id);
      setReviews(data);
      setReviewsError('');
    } catch (err) {
      setReviewsError(err.message);
    }
  }, [id]);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const ref = doc(db, 'courses', id);
      const snap = await getDoc(ref);
      setCourse(snap.exists() ? { id: snap.id, ...snap.data() } : null);
      await loadReviews();
      setLoading(false);
    }
    load();
  }, [id, loadReviews]);

  if (loading) {
    return (
      <main className="section">
        <div className="container">
          <p className={styles.loading}>Завантаження…</p>
        </div>
      </main>
    );
  }

  if (!course) {
    return (
      <main className="section">
        <div className="container">
          <h2 className="section-title">Курс не знайдено</h2>
          <Link to="/" className={styles.back}>← До списку курсів</Link>
        </div>
      </main>
    );
  }

  const avg =
    reviews.length > 0
      ? (reviews.reduce((s, r) => s + (r.rating || 0), 0) / reviews.length).toFixed(1)
      : null;

  return (
    <main className="section">
      <div className="container">
        <Link to="/" className={styles.back}>← До списку курсів</Link>
        <div className={styles.layout}>
          <div className={styles.banner} style={{ background: course.gradient }}>
            <span className={styles.emoji}>{course.emoji}</span>
          </div>
          <div className={styles.info}>
            <span className={`badge ${course.level} ${styles.levelBadge}`}>
              {course.levelLabel}
            </span>
            <h1 className={styles.title}>{course.title}</h1>
            <p className={styles.desc}>{course.desc}</p>
            <ul className={styles.meta}>
              <li>👨‍🏫 Викладач: <strong>{course.teacher}</strong></li>
              <li>⏱ Тривалість: <strong>{course.weeks} тижнів</strong></li>
              <li>⭐ Рейтинг: <strong>{course.rating} / 5.0</strong></li>
              <li>📂 Категорія: <strong>{course.categoryLabel}</strong></li>
              {avg && <li>💬 Середня оцінка студентів: <strong>{avg} / 5</strong> ({reviews.length})</li>}
            </ul>
            <button className={styles.enroll}>Записатися на курс</button>
          </div>
        </div>

        <section className={styles.reviewsSection}>
          <h2 className={styles.reviewsTitle}>Відгуки студентів</h2>
          <ReviewForm courseId={id} onAdded={loadReviews} />
          {reviewsError && <p className={styles.empty}>Помилка: {reviewsError}</p>}
          <div className={styles.reviewsList}>
            {reviews.length === 0 ? (
              <p className={styles.empty}>Поки що немає відгуків. Будьте першим!</p>
            ) : (
              reviews.map((r) => (
                <article key={r.id} className={styles.review}>
                  <header className={styles.reviewHead}>
                    <span className={styles.reviewer}>{r.userEmail}</span>
                    <span className={styles.rating}>{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
                  </header>
                  <p className={styles.reviewText}>{r.text}</p>
                  {r.dateFormatted && <span className={styles.date}>{r.dateFormatted}</span>}
                </article>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
