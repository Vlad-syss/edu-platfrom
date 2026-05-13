const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const admin = require('./firebaseConfig');

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || '*';
const STATIC_DIR = path.join(__dirname, '..', 'dist');

app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json());

const db = admin.firestore();

async function verifyToken(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    req.user = await admin.auth().verifyIdToken(token);
    next();
  } catch {
    res.status(403).json({ error: 'Invalid token' });
  }
}

app.get('/api/health', (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

app.get('/api/protected', verifyToken, (req, res) => {
  res.json({ message: `Hello, ${req.user.email}` });
});

app.get('/api/reviews/:courseId', async (req, res) => {
  try {
    const { courseId } = req.params;
    const snapshot = await db
      .collection('reviews')
      .where('courseId', '==', courseId)
      .get();

    const reviews = snapshot.docs.map((doc) => {
      const data = doc.data();
      const raw = data.createdAt;
      let date;
      if (raw?.toDate) date = raw.toDate();
      else if (typeof raw === 'string') date = new Date(raw);
      else date = new Date();
      const d = String(date.getDate()).padStart(2, '0');
      const m = String(date.getMonth() + 1).padStart(2, '0');
      const y = date.getFullYear();
      return {
        id: doc.id,
        ...data,
        createdAt: date.toISOString(),
        dateFormatted: `${d}.${m}.${y}`,
        _ts: date.getTime(),
      };
    });

    reviews.sort((a, b) => b._ts - a._ts);
    reviews.forEach((r) => delete r._ts);

    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/reviews', verifyToken, async (req, res) => {
  try {
    const { courseId, text, rating } = req.body;

    if (!courseId) return res.status(400).json({ error: 'courseId is required' });
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'text is required' });
    }
    if (text.trim().length < 10) {
      return res.status(400).json({ error: 'Мінімум 10 символів' });
    }
    if (text.trim().length > 500) {
      return res.status(400).json({ error: 'Максимум 500 символів' });
    }

    const newReview = {
      courseId,
      userId: req.user.uid,
      userEmail: req.user.email,
      text: text.trim(),
      rating: Number(rating) || 5,
      createdAt: new Date().toISOString(),
    };

    const docRef = await db.collection('reviews').add(newReview);
    res.status(201).json({ id: docRef.id, ...newReview });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

if (require('fs').existsSync(STATIC_DIR)) {
  app.use(express.static(STATIC_DIR));
  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(STATIC_DIR, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
