"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useTheme } from "@/src/hooks/use-theme";

export function ThemeInitializer() {
  const pathname = usePathname();
  const { setTheme } = useTheme();

  useEffect(() => {
    if (!pathname) return;
    if (pathname.startsWith("/admin")) setTheme("nova-haven");
    else if (pathname.startsWith("/store")) setTheme("nova-works");
    else setTheme("pixel-verse");
  }, [pathname, setTheme]);

  return null;
}
