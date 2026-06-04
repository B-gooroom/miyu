"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function AdminNavLink() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let active = true;

    fetch("/api/admin/status", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : { isAdmin: false }))
      .then((data: { isAdmin?: boolean }) => {
        if (active) {
          setIsAdmin(Boolean(data.isAdmin));
        }
      })
      .catch(() => {
        if (active) {
          setIsAdmin(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  if (!isAdmin) {
    return null;
  }

  return (
    <Link className="text-[var(--gold)] hover:text-[var(--gold)]" href="/admin">
      관리페이지
    </Link>
  );
}
