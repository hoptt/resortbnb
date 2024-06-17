"use client";

import Modal from "@/components/Modal";
import { useRouter } from "next/navigation";
export default function AdModal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <Modal isOpen={true} closeModal={() => router.back()} title={"⏱️"}>
      {children}
    </Modal>
  );
}
