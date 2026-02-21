"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Deal {
  id: string;
  title: string;
  amount: number | null;
  status: string;
  contactName: string | null;
  expectedCloseDate: string | null;
  notes: string | null;
  createdAt: string;
}

const stages = [
  { key: "inquiry", label: "Inquiry", color: "bg-slate-100" },
  { key: "quoted", label: "Quoted", color: "bg-blue-50" },
  { key: "negotiating", label: "Negotiating", color: "bg-yellow-50" },
  { key: "won", label: "Won", color: "bg-green-50" },
  { key: "lost", label: "Lost", color: "bg-red-50" },
];

export default function PipelinePage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/deals")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setDeals(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const groupedDeals = stages.map((stage) => ({
    ...stage,
    deals: deals.filter((d) => d.status === stage.key),
    total: deals
      .filter((d) => d.status === stage.key)
      .reduce((sum, d) => sum + (d.amount || 0), 0),
  }));

  if (loading) {
    return (
      <div className="py-12 text-center text-muted-foreground">Loading pipeline...</div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Pipeline</h1>
        <span className="text-sm text-muted-foreground">
          {deals.length} deal{deals.length !== 1 ? "s" : ""}
        </span>
      </div>

      {deals.length === 0 ? (
        <div className="py-12 text-center text-muted-foreground">
          No deals yet. Create contacts first, then add deals.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
          {groupedDeals.map((stage) => (
            <div key={stage.key} className="space-y-3">
              <div className={`rounded-lg p-3 ${stage.color}`}>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold">{stage.label}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {stage.deals.length}
                  </Badge>
                </div>
                {stage.total > 0 && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    {stage.total.toLocaleString("ko-KR")} won
                  </p>
                )}
              </div>

              <div className="space-y-2">
                {stage.deals.map((deal) => (
                  <Card key={deal.id} className="shadow-sm">
                    <CardContent className="p-3">
                      <p className="text-sm font-medium">{deal.title}</p>
                      {deal.contactName && (
                        <p className="mt-1 text-xs text-muted-foreground">
                          {deal.contactName}
                        </p>
                      )}
                      {deal.amount != null && (
                        <p className="mt-1 text-sm font-semibold">
                          {deal.amount.toLocaleString("ko-KR")} won
                        </p>
                      )}
                      {deal.expectedCloseDate && (
                        <p className="mt-1 text-xs text-muted-foreground">
                          Close: {new Date(deal.expectedCloseDate).toLocaleDateString("ko-KR")}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
