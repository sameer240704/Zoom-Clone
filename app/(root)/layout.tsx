import type { Metadata } from "next";
import StreamClientProvider from "@/providers/StreamClientProvider";
import React, { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Virtual Vibe",
  description:
    "Elevate your video calls with ease. Enjoy crisp audio, HD video, and secure meetings. Your go-to for seamless virtual communication.",
  icons: {
    icon: "/icons/logo.svg",
  },
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <StreamClientProvider>{children}</StreamClientProvider>
    </main>
  );
};

export default RootLayout;
