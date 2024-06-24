"use client";

import Footer from "@/components/Footer";
import PathStoreComponent from "@/components/Help/PathStoreComponent";
import ScrollComponent from "@/components/Help/ScrollComponent";
import Navbar from "@/components/Nav/Navbar";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RecoilRoot } from "recoil";

type Props = {
  children: React.ReactNode;
};

export const NextProvider = ({ children }: Props) => {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          {children}
          <Toaster />
          <ScrollComponent />
          <PathStoreComponent />
        </SessionProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </RecoilRoot>
  );
};

export const NextLayout = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};
