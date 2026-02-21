import { pgTable, pgEnum, text, integer, timestamp, primaryKey } from "drizzle-orm/pg-core";

// Enums
export const crmContactSource = pgEnum("crm_contact_source", [
  "website", "blog", "kmong", "referral", "direct", "other",
]);

export const crmContactStatus = pgEnum("crm_contact_status", [
  "lead", "prospect", "customer", "churned",
]);

export const crmDealStatus = pgEnum("crm_deal_status", [
  "inquiry", "quoted", "negotiating", "won", "lost",
]);

export const crmActivityType = pgEnum("crm_activity_type", [
  "email", "call", "meeting", "note",
]);

// Tables
export const crmCompanies = pgTable("crm_companies", {
  id: text("id").primaryKey().default("gen_random_uuid()"),
  name: text("name").notNull(),
  industry: text("industry"),
  website: text("website"),
  size: text("size"),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const crmContacts = pgTable("crm_contacts", {
  id: text("id").primaryKey().default("gen_random_uuid()"),
  name: text("name").notNull(),
  email: text("email").unique(),
  phone: text("phone"),
  companyId: text("company_id").references(() => crmCompanies.id, { onDelete: "set null" }),
  source: crmContactSource("source").notNull().default("direct"),
  status: crmContactStatus("status").notNull().default("lead"),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const crmDeals = pgTable("crm_deals", {
  id: text("id").primaryKey().default("gen_random_uuid()"),
  title: text("title").notNull(),
  amount: integer("amount"),
  status: crmDealStatus("status").notNull().default("inquiry"),
  contactId: text("contact_id").notNull().references(() => crmContacts.id, { onDelete: "cascade" }),
  expectedCloseDate: timestamp("expected_close_date", { withTimezone: true }),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const crmActivities = pgTable("crm_activities", {
  id: text("id").primaryKey().default("gen_random_uuid()"),
  type: crmActivityType("type").notNull(),
  content: text("content").notNull(),
  contactId: text("contact_id").references(() => crmContacts.id, { onDelete: "set null" }),
  dealId: text("deal_id").references(() => crmDeals.id, { onDelete: "set null" }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const crmTags = pgTable("crm_tags", {
  id: text("id").primaryKey().default("gen_random_uuid()"),
  name: text("name").notNull().unique(),
});

export const crmContactTags = pgTable("crm_contact_tags", {
  contactId: text("contact_id").notNull().references(() => crmContacts.id, { onDelete: "cascade" }),
  tagId: text("tag_id").notNull().references(() => crmTags.id, { onDelete: "cascade" }),
}, (table) => [
  primaryKey({ columns: [table.contactId, table.tagId] }),
]);
