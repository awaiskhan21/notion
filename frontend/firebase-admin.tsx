import serviceAccount from "@/service_key.json";
import {
  App,
  cert,
  getApp,
  getApps,
  initializeApp,
  ServiceAccount,
} from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

let app: App;

// Check if there's already an initialized app to avoid reinitializing
if (getApps().length === 0) {
  app = initializeApp({
    credential: cert(serviceAccount as ServiceAccount),
  });
} else {
  app = getApp(); // Use the already initialized app
}

const adminDb = getFirestore(app);

export { app as adminApp, adminDb };
