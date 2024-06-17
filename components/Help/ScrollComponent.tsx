"use client";
import { useEffect } from "react";

export default function ScrollComponent() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.scrollTo(0, 0);
  }, []);

  return null;
}
