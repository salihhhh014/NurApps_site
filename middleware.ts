import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: "/admin/:path*",
};

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

export function middleware(request: NextRequest) {
  const expectedPassword = process.env.ADMIN_PASSWORD;

  // Fail closed: админка недоступна, пока не задан пароль.
  if (!expectedPassword) {
    return new NextResponse("Admin panel is not configured", { status: 503 });
  }

  const authHeader = request.headers.get("authorization");

  if (authHeader?.startsWith("Basic ")) {
    try {
      const encoded = authHeader.slice(6).trim();
      const decoded = atob(encoded);
      const sep = decoded.indexOf(":");
      if (sep !== -1) {
        const username = decoded.slice(0, sep);
        const password = decoded.slice(sep + 1);
        if (
          username === "admin" &&
          timingSafeEqual(password, expectedPassword)
        ) {
          return NextResponse.next();
        }
      }
    } catch {
      // некорректный заголовок — падаем в 401 ниже
    }
  }

  return new NextResponse("Unauthorized", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Admin Panel", charset="UTF-8"',
      "Cache-Control": "no-store",
    },
  });
}
