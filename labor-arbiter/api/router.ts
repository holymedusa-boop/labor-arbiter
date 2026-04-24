import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import superjson from 'superjson';
import { db } from '../db/connection';
import { rules, cases, feedback, lawyerReviews, knowledgeUpdates, agentRuns } from '../db/schema';
import { eq, desc, sql } from 'drizzle-orm';
import { runAssessment } from './assessment';

const t = initTRPC.create({ transformer: superjson });

export const createRouter = t.router;
export const publicQuery = t.procedure;

export const appRouter = createRouter({
  // AI Assessment
  assessment: publicQuery
    .input(z.object({
      city: z.string(),
      disputeTypes: z.array(z.string()),
      years: z.number(),
      salary: z.number(),
      entryYear: z.number().optional(),
      entryMonth: z.number().optional(),
      description: z.string().optional(),
      evidenceStatus: z.record(z.boolean()).optional(),
    }))
    .mutation(async ({ input }) => {
      return runAssessment(input);
    }),

  // Rules
  rule: createRouter({
    list: publicQuery
      .input(z.object({ city: z.string().optional(), disputeType: z.string().optional() }))
      .query(async ({ input }) => {
        let query = db.select().from(rules);
        if (input.city) query = query.where(eq(rules.city, input.city)) as any;
        return query.orderBy(desc(rules.createdAt)).limit(100);
      }),
    create: publicQuery
      .input(z.object({
        city: z.string(),
        disputeType: z.string(),
        ruleType: z.string(),
        content: z.string(),
        source: z.string().optional(),
        confidence: z.string().default('medium'),
      }))
      .mutation(async ({ input }) => {
        return db.insert(rules).values(input).returning();
      }),
  }),

  // Cases
  case: createRouter({
    list: publicQuery
      .input(z.object({ city: z.string().optional(), disputeType: z.string().optional() }))
      .query(async ({ input }) => {
        let query = db.select().from(cases);
        if (input.city) query = query.where(eq(cases.city, input.city)) as any;
        return query.orderBy(desc(cases.createdAt)).limit(100);
      }),
  }),

  // Feedback
  feedback: createRouter({
    create: publicQuery
      .input(z.object({
        type: z.enum(['calculation_error', 'evidence_missing', 'legal_inaccurate', 'ux_issue']),
        content: z.string(),
        sessionId: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        return db.insert(feedback).values(input).returning();
      }),
    list: publicQuery
      .input(z.object({ status: z.string().optional() }).optional())
      .query(async ({ input }) => {
        let query = db.select().from(feedback);
        if (input?.status) query = query.where(eq(feedback.status, input.status)) as any;
        return query.orderBy(desc(feedback.createdAt)).limit(100);
      }),
    updateStatus: publicQuery
      .input(z.object({ id: z.number(), status: z.string(), assignedTo: z.string().optional() }))
      .mutation(async ({ input }) => {
        return db.update(feedback).set({ status: input.status, assignedTo: input.assignedTo }).where(eq(feedback.id, input.id));
      }),
  }),

  // Lawyer Reviews
  lawyerReview: createRouter({
    create: publicQuery
      .input(z.object({
        feedbackId: z.number(),
        lawyerName: z.string(),
        verdict: z.enum(['correct', 'incorrect', 'partially_correct']),
        comment: z.string(),
        ruleUpdate: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        return db.insert(lawyerReviews).values(input).returning();
      }),
    list: publicQuery.query(async () => {
      return db.select().from(lawyerReviews).orderBy(desc(lawyerReviews.createdAt)).limit(100);
    }),
  }),

  // Stats
  stats: createRouter({
    overview: publicQuery.query(async () => {
      const totalQueries = db.$count(userSessions);
      const totalFeedback = db.$count(feedback);
      const pendingReviews = db.select({ count: sql<number>`count(*)` }).from(feedback).where(eq(feedback.status, 'pending'));
      const totalRules = db.$count(rules);
      return {
        totalQueries: await totalQueries,
        totalFeedback: await totalFeedback,
        pendingReviews: (await pendingReviews)[0]?.count || 0,
        totalRules: await totalRules,
      };
    }),
  }),

  // Agent
  agent: createRouter({
    list: publicQuery.query(async () => {
      return db.select().from(agentRuns).orderBy(desc(agentRuns.createdAt)).limit(50);
    }),
    trigger: publicQuery
      .input(z.object({ agentType: z.enum(['region_scanner', 'case_analyzer', 'feedback_processor']) }))
      .mutation(async ({ input }) => {
        const run = await db.insert(agentRuns).values({
          agentType: input.agentType,
          status: 'running',
          input: JSON.stringify({ triggered: new Date().toISOString() }),
        }).returning();
        // Simulate agent run
        setTimeout(async () => {
          await db.update(agentRuns).set({
            status: 'completed',
            output: JSON.stringify({ message: `${input.agentType} completed`, itemsFound: Math.floor(Math.random() * 10) + 1 }),
            itemsProcessed: Math.floor(Math.random() * 20) + 1,
          }).where(eq(agentRuns.id, run[0].id));
        }, 2000);
        return run[0];
      }),
  }),
});

import { userSessions } from '../db/schema';

export type AppRouter = typeof appRouter;
