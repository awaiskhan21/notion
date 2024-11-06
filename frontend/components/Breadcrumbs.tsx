"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { db } from "@/firebase";
import { doc } from "firebase/firestore";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";

function Breadcrumbs() {
  const path = usePathname();
  const segments = path.split("/");
  const [data, loading, error] = useDocumentData(
    doc(db, "documents", segments[2])
  );

  console.log(segments);
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          {segments.map((segment, index) => {
            if (!segment) return null;
            const href = `/${segments.slice(1, index + 1).join("/")}`;
            const isLast = index === segments.length - 1;
            return (
              <Fragment key={segment}>
                <BreadcrumbSeparator />

                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage>{data?.title} </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={href}>{segment} </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
export default Breadcrumbs;
