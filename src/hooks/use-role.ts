"use client";
import { useSession } from "next-auth/react";

export function useRole() {
  const { data, status } = useSession();
  const role = (data?.user as any)?.role as 'ADMIN' | 'STORE' | undefined;
  return { role, status };
}





