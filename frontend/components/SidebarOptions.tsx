"use client";
import { db } from "@/firebase";
import { doc } from "firebase/firestore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDocumentData } from "react-firebase-hooks/firestore";

function SidebarOptions({ href, id }: { href: string; id: string }) {
  //this hook gives doc data
  const [data, loading, err] = useDocumentData(doc(db, "documents", id));
  const pathname = usePathname();
  const isActive = href.includes(pathname) && pathname !== "/";
  console.log("isActive => " + isActive);

  if (!data) return null;

  return (
    <Link
      href={href}
      className={`border p-2 rounded-md bg ${
        isActive ? "bg-gray-300 font-bold border-black" : "border-gray-400"
      }`}
    >
      <p className="truncate">{data?.title}</p>
    </Link>
  );
}
export default SidebarOptions;
