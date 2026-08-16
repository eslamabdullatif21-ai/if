import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname !== "/") return NextResponse.next();

  const preferredLanguage = request.headers
    .get("accept-language")
    ?.toLowerCase()
    .startsWith("ar")
    ? "ar"
    : "en";

  return NextResponse.redirect(new URL("/" + preferredLanguage, request.url));
}

export const config = {
  matcher: ["/"],
};
