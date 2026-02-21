import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { crmContacts, crmCompanies } from "@/db/schema";
import { eq, ilike, or, desc, sql } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "";
  const source = searchParams.get("source") || "";

  try {
    let query = db
      .select({
        id: crmContacts.id,
        name: crmContacts.name,
        email: crmContacts.email,
        phone: crmContacts.phone,
        companyId: crmContacts.companyId,
        companyName: crmCompanies.name,
        source: crmContacts.source,
        status: crmContacts.status,
        notes: crmContacts.notes,
        createdAt: crmContacts.createdAt,
      })
      .from(crmContacts)
      .leftJoin(crmCompanies, eq(crmContacts.companyId, crmCompanies.id))
      .orderBy(desc(crmContacts.createdAt))
      .$dynamic();

    const conditions = [];

    if (search) {
      conditions.push(
        or(
          ilike(crmContacts.name, `%${search}%`),
          ilike(crmContacts.email, `%${search}%`),
          ilike(crmContacts.phone, `%${search}%`)
        )
      );
    }

    if (status) {
      conditions.push(eq(crmContacts.status, status as "lead" | "prospect" | "customer" | "churned"));
    }

    if (source) {
      conditions.push(eq(crmContacts.source, source as "website" | "blog" | "kmong" | "referral" | "direct" | "other"));
    }

    if (conditions.length > 0) {
      for (const condition of conditions) {
        if (condition) query = query.where(condition);
      }
    }

    const contacts = await query;
    return NextResponse.json(contacts);
  } catch (error) {
    console.error("Failed to fetch contacts:", error);
    return NextResponse.json({ error: "Failed to fetch contacts" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, companyId, source, notes } = body;

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const [contact] = await db
      .insert(crmContacts)
      .values({
        name,
        email: email || null,
        phone: phone || null,
        companyId: companyId || null,
        source: source || "direct",
        notes: notes || null,
      })
      .returning();

    return NextResponse.json(contact, { status: 201 });
  } catch (error: unknown) {
    console.error("Failed to create contact:", error);
    const message = error instanceof Error ? error.message : "Failed to create contact";
    if (message.includes("unique") || message.includes("duplicate")) {
      return NextResponse.json({ error: "Email already exists" }, { status: 409 });
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
