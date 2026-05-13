import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './CourseCard.module.css';

export default function CourseCard({ course }) {
  const { user } = useAuth();

  return (
    <article className={styles.card}>
      <div className={styles.banner} style={{ background: course.gradient }}>
        <span className={styles.emoji}>{course.emoji}</span>
      </div>
      <div className={styles.body}>
        <span className={`badge ${course.level} ${styles.levelBadge}`}>{course.levelLabel}</span>
        <h3 className={styles.title}>{course.title}</h3>
        <p className={styles.desc}>{course.desc}</p>
        <ul className={styles.meta}>
          <li>👨‍🏫 {course.teacher}</li>
          <li>⏱ {course.weeks} тижнів</li>
          <li>⭐ {course.rating} / 5.0</li>
          <li>📂 {course.categoryLabel}</li>
        </ul>
        {user ? (
          <Link to={`/courses/${course.id}`} className={styles.btn}>Деталі курсу</Link>
        ) : (
          <Link to="/login" className={`${styles.btn} ${styles.btnSecondary}`}>
            Увійдіть, щоб переглянути
          </Link>
        )}
      </div>
    </article>
  );
}
