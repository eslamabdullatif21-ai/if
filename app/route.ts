import { NextResponse, type NextRequest } from "next/server";

export function GET(request: NextRequest) {
  const preferredLanguage = request.headers
    .get("accept-language")
    ?.toLowerCase()
    .startsWith("ar")
    ? "ar"
    : "en";

  return NextResponse.redirect(new URL("/" + preferredLanguage, request.url));
}
