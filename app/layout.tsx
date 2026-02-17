import type { Metadata } from "next";
import { Cairo, Inter, Tajawal } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["latin", "arabic"],
  weight: ["300", "400", "500", "600", "700"],
});

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["latin", "arabic"],
  weight: ["300", "400", "500", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "عيادة الأسنان - Dental Clinic",
  description:
    "عيادة أسنان حديثة متخصصة في الزراعة والتجميل والعلاجات المتقدمة",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="ar" dir="rtl">
      <body
        className={`${tajawal.variable} ${inter.variable} ${cairo.variable} ${geistMono.variable} antialiased bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300`}
      >
        <ThemeProvider>{children}</ThemeProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const pathname = window.location.pathname;
                const locale = pathname.startsWith('/en') ? 'en' : 'ar';
                const htmlEl = document.documentElement;
                htmlEl.lang = locale;
                htmlEl.dir = locale === 'ar' ? 'rtl' : 'ltr';
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
