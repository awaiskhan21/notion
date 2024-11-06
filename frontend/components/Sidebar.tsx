"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { db } from "@/firebase";
import { useUser } from "@clerk/nextjs";
import {
  collectionGroup,
  DocumentData,
  query,
  where,
} from "firebase/firestore";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import NewDocumentButton from "./NewDocumentButton";
import SidebarOptions from "./SidebarOptions";

interface RoomDocument extends DocumentData {
  createdAt: string;
  role: "owner" | "editor";
  roomId: string;
  userId: string;
}

function Sidebar() {
  const { user } = useUser();
  const [groupedData, setGroupedData] = useState<{
    owner: RoomDocument[];
    editor: RoomDocument[];
  }>({ owner: [], editor: [] });
  const [data, loading, error] = useCollection(
    user &&
      query(
        collectionGroup(db, "rooms"),
        where("userId", "==", user.emailAddresses[0].toString())
      )
  );
  useEffect(() => {
    if (!data) return;

    const grouped = data?.docs?.reduce<{
      owner: RoomDocument[];
      editor: RoomDocument[];
    }>(
      (acc, curr) => {
        const roomData = curr.data() as RoomDocument;
        roomData.role === "owner"
          ? acc.owner.push({ id: curr.id, ...roomData })
          : acc.editor.push({ id: curr.id, ...roomData });
        return acc;
      },
      {
        owner: [],
        editor: [],
      }
    );
    setGroupedData(grouped);
  }, [data]);
  const menuOptions = (
    <>
      <NewDocumentButton />

      <div className="flex py-4 space-y-4 flex-col md:max-w-36">
        {groupedData.owner.length === 0 ? (
          <h2 className="text-gray-500 font-semibold text-2xl">No doc found</h2>
        ) : (
          <>
            <h2 className="text-gray-500 text-2xl font-semibold">My Doc</h2>
            {groupedData.owner.map((doc) => (
              <SidebarOptions
                key={doc.id}
                href={`/doc/${doc.id}`}
                id={doc.id}
              />
            ))}
          </>
        )}
      </div>
      <div>
        {groupedData.editor.length > 0 && (
          <>
            <h2>Shared With Me</h2>
            {groupedData.editor.map((doc) => (
              <SidebarOptions
                key={doc.id}
                href={`/doc/${doc.id}`}
                id={doc.id}
              />
            ))}
          </>
        )}
      </div>
    </>
  );
  return (
    <div className="flex flex-col p-2 md:p-5 bg-gray-200 gap-y-2 relative">
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <Menu />
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            {menuOptions}
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden md:inline">{menuOptions}</div>
    </div>
  );
}
export default Sidebar;
