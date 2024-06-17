"use client";

import Footer from "@/components/Footer";
import PathStoreComponent from "@/components/Help/PathStoreComponent";
import ScrollComponent from "@/components/Help/ScrollComponent";
import Navbar from "@/components/Nav/Navbar";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { RecoilRoot } from "recoil";

type Props = {
  children: React.ReactNode;
};

const queryClient = new QueryClient();

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
