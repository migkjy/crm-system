import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { crmDeals, crmContacts } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET() {
  try {
    const deals = await db
      .select({
        id: crmDeals.id,
        title: crmDeals.title,
        amount: crmDeals.amount,
        status: crmDeals.status,
        contactId: crmDeals.contactId,
        contactName: crmContacts.name,
        expectedCloseDate: crmDeals.expectedCloseDate,
        notes: crmDeals.notes,
        createdAt: crmDeals.createdAt,
      })
      .from(crmDeals)
      .leftJoin(crmContacts, eq(crmDeals.contactId, crmContacts.id))
      .orderBy(desc(crmDeals.createdAt));

    return NextResponse.json(deals);
  } catch (error) {
    console.error("Failed to fetch deals:", error);
    return NextResponse.json({ error: "Failed to fetch deals" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, amount, status, contactId, expectedCloseDate, notes } = body;

    if (!title || !contactId) {
      return NextResponse.json({ error: "Title and contactId are required" }, { status: 400 });
    }

    const [deal] = await db
      .insert(crmDeals)
      .values({
        title,
        amount: amount ? parseInt(amount, 10) : null,
        status: status || "inquiry",
        contactId,
        expectedCloseDate: expectedCloseDate ? new Date(expectedCloseDate) : null,
        notes: notes || null,
      })
      .returning();

    return NextResponse.json(deal, { status: 201 });
  } catch (error) {
    console.error("Failed to create deal:", error);
    return NextResponse.json({ error: "Failed to create deal" }, { status: 500 });
  }
}
