"use client";

import { db } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { FormEvent, useEffect, useState, useTransition } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

function DocumentComponent({ id }: { id: string }) {
  const [title, setTitle] = useState("");
  const [isUpdating, startTransition] = useTransition();
  const [data, loading, error] = useDocumentData(doc(db, "documents", id));

  useEffect(() => {
    if (data) {
      setTitle(data.title);
    }
  }, [data]);

  const updateTitle = (e: FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      startTransition(async () => {
        await updateDoc(doc(db, "documents", id), {
          title: title,
        });
      });
    }
  };
  return (
    <div>
      DocumentComponent {id}
      <div className="flex flex-col justify-center max-w-6xl m-auto pb-5">
        <form onSubmit={updateTitle} className="flex space-x-2 ">
          {/* update title */}
          <Input
            value={title}
            disabled={isUpdating}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button disabled={isUpdating} type="submit">
            {isUpdating ? "Updating..." : "Update Title"}
          </Button>
        </form>
      </div>
      <div>
        {/* manageUsers */}

        {/* avatars */}
      </div>
      {/* collaborative editor */}
    </div>
  );
}
export default DocumentComponent;
