import { revalidate } from "lib/shopify";
import type { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest): Promise<NextResponse> {
	console.log("[Revalidate Route] POST handler invoked.");
	return revalidate(req);
}
