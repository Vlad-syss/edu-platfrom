import { auth } from './firebase';

const API_BASE = import.meta.env.VITE_API_BASE || '';

async function authHeader() {
  const token = await auth.currentUser?.getIdToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function handle(res) {
  if (!res.ok) {
    let message = `Request failed: ${res.status}`;
    try {
      const data = await res.json();
      if (data?.error) message = data.error;
    } catch {}
    throw new Error(message);
  }
  return res.json();
}

export async function fetchReviews(courseId) {
  const res = await fetch(`${API_BASE}/api/reviews/${encodeURIComponent(courseId)}`, {
    headers: await authHeader(),
  });
  return handle(res);
}

export async function submitReview(courseId, text, rating) {
  const res = await fetch(`${API_BASE}/api/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(await authHeader()),
    },
    body: JSON.stringify({ courseId, text, rating }),
  });
  return handle(res);
}
