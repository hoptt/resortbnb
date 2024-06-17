"use client";

import Modal from "@/components/Modal";
import { useRouter } from "next/navigation";
import { SignInComponent } from "@/components/SignIn";
export default function SignInPage() {
  const router = useRouter();
  return (
    <Modal isOpen={true} closeModal={() => router.back()} title={"👋"}>
      <SignInComponent />
    </Modal>
  );
}
