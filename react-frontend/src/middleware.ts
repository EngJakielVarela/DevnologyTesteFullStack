import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { method } = request;
  const { headers } = request;

  if (pathname === "/login") {
  }
}
