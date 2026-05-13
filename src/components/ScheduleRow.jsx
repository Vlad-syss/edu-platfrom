import styles from './ScheduleRow.module.css';

export default function ScheduleRow({ row, index }) {
  return (
    <tr className={`${styles.row} ${index % 2 === 0 ? styles.even : ''}`}>
      <td className={styles.day}>{row.day}</td>
      <td className={styles.time}>{row.time}</td>
      <td>{row.course}</td>
      <td className={styles.teacher}>{row.teacher}</td>
      <td><span className={`badge ${row.format}`}>{row.label}</span></td>
    </tr>
  );
}
