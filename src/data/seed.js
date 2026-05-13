import { collection, doc, getDocs, setDoc, writeBatch } from 'firebase/firestore';
import { db } from '../firebase';
import { courses, scheduleData } from './courses';

export async function seedFirestore() {
  const coursesCol = collection(db, 'courses');
  const existing = await getDocs(coursesCol);
  if (!existing.empty) {
    return { skipped: true, message: 'Колекція courses вже містить документи.' };
  }

  const batch = writeBatch(db);
  courses.forEach((c) => {
    batch.set(doc(coursesCol, String(c.id)), c);
  });
  scheduleData.forEach((row, i) => {
    batch.set(doc(collection(db, 'schedule'), `row-${i}`), row);
  });
  await batch.commit();
  return { ok: true, courses: courses.length, schedule: scheduleData.length };
}

if (typeof window !== 'undefined') {
  window.seedFirestore = seedFirestore;
}
