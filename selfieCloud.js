import { getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

async function request(uid, suffix = '', options = {}) {
  const app = getApp();
  const user = getAuth(app).currentUser;
  if (!user || user.uid !== uid || uid === 'local') throw new Error('Bitte anmelden.');
  const token = await user.getIdToken();
  const base = `https://firestore.googleapis.com/v1/projects/${app.options.projectId}/databases/(default)/documents/users/${encodeURIComponent(uid)}/sixpackPhotos`;
  const response = await fetch(`${base}${suffix}`, {
    ...options,
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    signal: AbortSignal.timeout(20000), cache: 'no-store',
  });
  if (!response.ok) throw new Error(`Foto-Sync: HTTP ${response.status}`);
  return response.json();
}

export async function listSelfies(uid) {
  const photos = [];
  let pageToken = '';
  do {
    const page = await request(uid, `?pageSize=20${pageToken ? `&pageToken=${encodeURIComponent(pageToken)}` : ''}`);
    for (const document of page.documents || []) {
      const f = document.fields;
      photos.push({ id: document.name.split('/').pop(), date: f.date.stringValue, url: f.dataUrl.stringValue });
    }
    pageToken = page.nextPageToken;
  } while (pageToken);
  return photos.sort((a, b) => b.date.localeCompare(a.date));
}

// Bounded JPEG fits into one Firestore document. Originals remain on the device.
export async function prepareSelfie(file) {
  const url = URL.createObjectURL(file);
  try {
    const image = new Image();
    image.src = url;
    await image.decode();
    const canvas = document.createElement('canvas');
    const scale = Math.min(1, 1600 / Math.max(image.naturalWidth, image.naturalHeight));
    canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
    const context = canvas.getContext('2d');
    context.fillStyle = '#fff';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    for (const quality of [0.85, 0.7, 0.5, 0.3]) {
      const dataUrl = canvas.toDataURL('image/jpeg', quality);
      if (dataUrl.length <= 700000) return dataUrl;
    }
    throw new Error('Foto kann nicht ausreichend verkleinert werden.');
  } finally { URL.revokeObjectURL(url); }
}

export async function uploadSelfie(uid, id, date, dataUrl) {
  if (!/^[\w-]{1,128}$/.test(id) || !dataUrl.startsWith('data:image/jpeg;base64,') || dataUrl.length > 700000) throw new Error('Ungültiges Foto.');
  const fields = Object.fromEntries(Object.entries({ date, dataUrl }).map(([key, value]) => [key, { stringValue: value }]));
  await request(uid, `/${encodeURIComponent(id)}`, { method: 'PATCH', body: JSON.stringify({ fields }) });
}
