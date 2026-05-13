import styles from './About.module.css';

const team = [
  { emoji: '👨‍🏫', name: 'Олексій Романченко', role: 'Python & Data Science' },
  { emoji: '👩‍🎨', name: 'Марина Ковальчук',  role: 'UI/UX та Дизайн'      },
  { emoji: '👨‍💻', name: 'Дмитро Сидоренко',  role: 'Веб-технології'       },
  { emoji: '👨‍🔬', name: 'Іван Мельник',       role: 'ML та Аналіз даних'  },
];

export default function About() {
  return (
    <main className="section">
      <div className="container">
        <h2 className="section-title">Про нас</h2>
        <p className="section-sub">Хто ми і чому обирають EduPlatform</p>

        <div className={styles.grid}>
          <div className={styles.textBlock}>
            <h3 className={styles.h3}>Наша місія</h3>
            <p>EduPlatform — це сучасна навчальна платформа, що об'єднує студентів та найкращих викладачів України. Ми віримо, що якісна освіта має бути доступною кожному — незалежно від міста та часу.</p>
            <h3 className={styles.h3} style={{marginTop: '24px'}}>Що ми пропонуємо</h3>
            <ul className={styles.list}>
              <li>📚 Понад 120 курсів з різних дисциплін</li>
              <li>🎓 Сертифікати після проходження курсів</li>
              <li>🔴 Заняття у форматі онлайн, офлайн та гібрид</li>
              <li>📊 Персональна статистика та прогрес</li>
              <li>🤝 Спільнота понад 45 000 студентів</li>
            </ul>
          </div>

          <div className={styles.statsBlock}>
            <div className={styles.statCard}><span className={styles.statNum}>2019</span><span className={styles.statLabel}>Рік заснування</span></div>
            <div className={styles.statCard}><span className={styles.statNum}>120+</span><span className={styles.statLabel}>Курсів</span></div>
            <div className={styles.statCard}><span className={styles.statNum}>45k</span><span className={styles.statLabel}>Студентів</span></div>
            <div className={styles.statCard}><span className={styles.statNum}>98%</span><span className={styles.statLabel}>Задоволені</span></div>
          </div>
        </div>

        <h3 className={styles.teamTitle}>Наші викладачі</h3>
        <div className={styles.team}>
          {team.map((t, i) => (
            <div key={i} className={styles.teamCard}>
              <span className={styles.teamEmoji}>{t.emoji}</span>
              <h4 className={styles.teamName}>{t.name}</h4>
              <p className={styles.teamRole}>{t.role}</p>
            </div>
          ))}
        </div>

        <div className={styles.contacts}>
          <h3 className={styles.h3}>Контакти</h3>
          <address className={styles.address}>
            <p>📍 вул. Університетська, 1, Львів</p>
            <p>📞 +380 (32) 258-00-00</p>
            <p>✉️ support@eduplatform.ua</p>
          </address>
        </div>
      </div>
    </main>
  );
}
