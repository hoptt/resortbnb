// 있어야 prerender fetch failed 오류 안뜨고 정상 빌드됩니다
export const dynamic = "force-dynamic";

import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
