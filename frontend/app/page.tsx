import { ArrowLeftCircle } from "lucide-react";

export default function Home() {
  return (
    <main className="flex items-center space-x-2 animate-none">
      <ArrowLeftCircle className="w-10 h-10" />
      <h1 className="text-xl font-bold">
        Get Started with creating a New Document
      </h1>
    </main>
  );
}
