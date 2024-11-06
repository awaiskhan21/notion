import DocumentComponent from "@/components/DocumentComponent";
import { auth } from "@clerk/nextjs/server";

async function DocumentPage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const { userId, redirectToSignIn, sessionClaims } = await auth();
  if (!userId) return redirectToSignIn();
  return (
    <div className=" flex flex-col min-h-screen">
      <DocumentComponent id={id} />
    </div>
  );
}
export default DocumentPage;
