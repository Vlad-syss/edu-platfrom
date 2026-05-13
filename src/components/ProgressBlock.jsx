import styles from './ProgressBlock.module.css';

export default function ProgressBlock({ label, pct, color }) {
  return (
    <div className={styles.item}>
      <div className={styles.header}>
        <span>{label}</span>
        <span className={styles.pct}>{pct}%</span>
      </div>
      <div className={styles.bar}>
        <div className={styles.fill} style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}
