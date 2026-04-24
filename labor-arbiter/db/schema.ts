import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

export const rules = sqliteTable("rules", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  city: text("city").notNull(),
  disputeType: text("dispute_type").notNull(),
  ruleType: text("rule_type").notNull(), // base, overtime, cap, statute, etc.
  content: text("content").notNull(),
  source: text("source"),
  effectiveDate: text("effective_date"),
  confidence: text("confidence").default("medium"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const cases = sqliteTable("cases", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  caseNumber: text("case_number"),
  court: text("court").notNull(),
  city: text("city").notNull(),
  disputeType: text("dispute_type").notNull(),
  title: text("title").notNull(),
  summary: text("summary"),
  ruling: text("ruling"),
  referenceValue: text("reference_value"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const userSessions = sqliteTable("user_sessions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  sessionId: text("session_id").notNull().unique(),
  selectedTypes: text("selected_types"), // JSON string
  city: text("city"),
  salary: real("salary"),
  years: real("years"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const feedback = sqliteTable("feedback", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  sessionId: text("session_id"),
  type: text("type").notNull(), // calculation_error, evidence_missing, legal_inaccurate, ux_issue
  content: text("content").notNull(),
  screenshot: text("screenshot"),
  status: text("status").default("pending"), // pending, reviewing, resolved, rejected
  assignedTo: text("assigned_to"),
  resolution: text("resolution"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const lawyerReviews = sqliteTable("lawyer_reviews", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  feedbackId: integer("feedback_id"),
  lawyerName: text("lawyer_name"),
  verdict: text("verdict"), // correct, incorrect, partially_correct
  comment: text("comment"),
  ruleUpdate: text("rule_update"), // JSON of rule changes
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const knowledgeUpdates = sqliteTable("knowledge_updates", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  type: text("type").notNull(), // rule_change, case_summary, agent_discovery
  source: text("source").notNull(),
  content: text("content").notNull(),
  applied: integer("applied").default(0),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const agentRuns = sqliteTable("agent_runs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  agentType: text("agent_type").notNull(), // region_scanner, case_analyzer, feedback_processor
  status: text("status").default("running"),
  input: text("input"),
  output: text("output"),
  itemsProcessed: integer("items_processed").default(0),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});
