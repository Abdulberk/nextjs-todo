'use client';
import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from "./theme/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import Navbar from "./_components/navbar";
import "./globals.css";
import Cookies from "js-cookie";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    let token: string | undefined = undefined;
    if (typeof window !== "undefined") {
      token = Cookies.get("token")
    }

    if (!token && pathname !== "/login" && pathname !== "/signup") {
      router.push("/login");
    }


  }, [pathname, router]);
  return (
    <QueryClientProvider client={queryClient}>
    <html lang="en">
      <body style = {{background: "#f2f2f2"}}>
      {pathname == "/login" || pathname == "/signup" ? null : <Navbar />}
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
          {children}
          </ThemeProvider>
        </AppRouterCacheProvider>

      </body>
    </html>
    </QueryClientProvider>
  );
}
