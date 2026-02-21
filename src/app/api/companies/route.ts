import { NextResponse } from "next/server";
import { db } from "@/db";
import { crmCompanies } from "@/db/schema";
import { asc } from "drizzle-orm";

export async function GET() {
  try {
    const companies = await db
      .select({
        id: crmCompanies.id,
        name: crmCompanies.name,
      })
      .from(crmCompanies)
      .orderBy(asc(crmCompanies.name));

    return NextResponse.json(companies);
  } catch (error) {
    console.error("Failed to fetch companies:", error);
    return NextResponse.json({ error: "Failed to fetch companies" }, { status: 500 });
  }
}
