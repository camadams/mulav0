import {
  boolean,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  real,
} from "drizzle-orm/pg-core";

import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const userTable = pgTable("user", {
  // id: integer("id").notNull().primaryKey({ autoIncrement: true }),
  id: text("id").notNull().primaryKey().default("1"),
  username: text("username").notNull().unique(),
  password_hash: text("password_hash").notNull(),
  // notifications_count: integer("notifications_count").notNull().default(0),
  emailAddress: text("emailAddress").notNull().unique(),
  age: integer("age").notNull().default(18),
});

export const sessionTable = pgTable("session", {
  id: text("id").primaryKey().default("1"),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

const spendingsSchema = {
  id: serial("id").primaryKey(),
  date: timestamp("date", { mode: "date" }).notNull(),
  description: text("description").notNull(),
  categoryId: integer("category_id")
    .notNull()
    .references(() => categoryTable.id),
  price: real("price").notNull(),
  userId: integer("user_id")
    .notNull()
    .references(() => userTable.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at"),
};
export const spendingTable = pgTable("spending", spendingsSchema);

export const categoryTable = pgTable("category", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  color: text("color").notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  userId: integer("user_id")
    .notNull()
    .references(() => userTable.id),
});

export const webhookEvents = pgTable("webhookEvent", {
  id: integer("id").primaryKey().default(1),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  eventName: text("eventName").notNull(),
  processed: boolean("processed").default(false),
  body: jsonb("body").notNull(),
  processingError: text("processingError"),
});

export type NewSpending = typeof spendingTable.$inferInsert;
export type Category = typeof categoryTable.$inferInsert;
export type NewWebhookEvent = typeof webhookEvents.$inferInsert;

export const insertSpendingSchema = createInsertSchema(spendingTable, {
  description: z
    .string()
    .min(3, { message: "Title must be at least 3 characters" }),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, {
    message: "Amount must be a valid monetary value",
  }),
  categoryId: z.string().min(1, { message: "Category is required" }),
  date: z.string(),
});

// Object.keys(spendingsSchema).forEach((key) => {
//   spendingsSchema[key];
//   //   console.log(`Field: ${key}, Value: ${value}`);
// });
