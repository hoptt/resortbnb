import { ReactNode } from "react";

export default function Layout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <>
      <div className="mt-20 p-5 md:p-10 min-h-[83vh]">{children}</div>
      {modal}
    </>
  );
}
