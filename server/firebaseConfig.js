const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

let credential;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  credential = admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT));
} else {
  const keyPath = path.join(__dirname, 'serviceAccountKey.json');
  if (!fs.existsSync(keyPath)) {
    throw new Error(
      'serviceAccountKey.json not found. Download it from Firebase Console → Project settings → Service accounts → Generate new private key, and place it in the server/ folder.',
    );
  }
  credential = admin.credential.cert(require(keyPath));
}

admin.initializeApp({ credential });

module.exports = admin;
