import { Inter_Tight, Noto_Sans_KR, Gamja_Flower } from "next/font/google";

export const noto_sans = Noto_Sans_KR({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export const inter = Inter_Tight({
  subsets: ["latin"],
  weight: ["100", "400", "700"],
});

export const gamja_Flower = Gamja_Flower({
  subsets: ["latin"],
  weight: ["400"],
});
