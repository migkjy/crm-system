import { db } from "@/db";
import { crmContacts, crmDeals } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function getStats() {
  const [contactStats] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(crmContacts);

  const [dealStats] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(crmDeals);

  const [wonDeals] = await db
    .select({
      count: sql<number>`count(*)::int`,
      total: sql<number>`coalesce(sum(amount), 0)::int`,
    })
    .from(crmDeals)
    .where(eq(crmDeals.status, "won"));

  const statusCounts = await db
    .select({
      status: crmContacts.status,
      count: sql<number>`count(*)::int`,
    })
    .from(crmContacts)
    .groupBy(crmContacts.status);

  return {
    totalContacts: contactStats.count,
    totalDeals: dealStats.count,
    wonDeals: wonDeals.count,
    wonAmount: wonDeals.total,
    statusCounts: Object.fromEntries(statusCounts.map((s) => [s.status, s.count])),
  };
}

export default async function DashboardPage() {
  const stats = await getStats();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Contacts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalContacts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Deals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalDeals}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Won Deals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.wonDeals}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Won Amount
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.wonAmount.toLocaleString("ko-KR")} won
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Contact Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {(["lead", "prospect", "customer", "churned"] as const).map((status) => (
                <div key={status} className="flex items-center justify-between">
                  <span className="capitalize">{status}</span>
                  <span className="font-medium">{stats.statusCounts[status] || 0}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link
              href="/contacts/new"
              className="block rounded-md border p-3 text-sm hover:bg-accent transition-colors"
            >
              Add New Lead
            </Link>
            <Link
              href="/contacts"
              className="block rounded-md border p-3 text-sm hover:bg-accent transition-colors"
            >
              View All Contacts
            </Link>
            <Link
              href="/pipeline"
              className="block rounded-md border p-3 text-sm hover:bg-accent transition-colors"
            >
              View Pipeline
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
