import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["ar", "en"];
const defaultLocale = "ar";

function getLocalizedRedirect(pathname: string, locale: string) {
  if (locales.some((l) => pathname.startsWith(`/${l}`))) {
    return null;
  }
  return `/${locale}${pathname}`;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return NextResponse.next();

  // Get locale from browser or default
  const locale =
    request.headers.get("accept-language")?.split(",")[0]?.split("-")[0] ||
    defaultLocale;
  const finalLocale = locales.includes(locale) ? locale : defaultLocale;

  // Redirect to localized path
  const redirectUrl = new URL(
    getLocalizedRedirect(pathname, finalLocale),
    request.url,
  );
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: ["/((?!_next|_vercel|.*\\..*).*)"],
};
