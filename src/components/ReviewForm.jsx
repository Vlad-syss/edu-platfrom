import { useState } from 'react';
import { submitReview } from '../api';
import styles from './ReviewForm.module.css';

export default function ReviewForm({ courseId, onAdded }) {
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim()) return;
    setBusy(true);
    setError('');
    try {
      await submitReview(courseId, text.trim(), rating);
      setText('');
      setRating(5);
      onAdded?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3 className={styles.title}>Залишити відгук</h3>
      <div className={styles.stars}>
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            className={`${styles.star} ${n <= rating ? styles.starActive : ''}`}
            onClick={() => setRating(n)}
            aria-label={`${n} зірок`}
          >
            ★
          </button>
        ))}
      </div>
      <textarea
        className={styles.textarea}
        placeholder="Поділіться своїм досвідом про курс (мінімум 10 символів)..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        minLength={10}
        maxLength={500}
        required
      />
      <div className={styles.counter}>{text.length} / 500</div>
      {error && <p className={styles.error}>{error}</p>}
      <button className={styles.submit} disabled={busy}>
        {busy ? 'Надсилання…' : 'Надіслати відгук'}
      </button>
    </form>
  );
}
