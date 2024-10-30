"use server";

import { adminDb } from "@/firebase-admin";
import { auth } from "@clerk/nextjs/server";

export async function createNewDocument() {
  const { userId, redirectToSignIn, sessionClaims } = await auth();
  if (!userId) return redirectToSignIn();

  const docCollectionRef = adminDb.collection("documents");
  const docRef = await docCollectionRef.add({ title: "New Doc" });
  await adminDb
    .collection("users")
    .doc(sessionClaims?.email!)
    .collection("rooms")
    .doc(docRef.id)
    .set({
      userId: sessionClaims?.email!,
      role: "owner",
      createdAt: new Date(),
      roomId: docRef.id,
    });
  return { docId: docRef.id };
}
