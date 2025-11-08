import { pgTable, text, timestamp, varchar, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
  email: varchar("email", { length: 256 }).unique().notNull(),
});

export type NewUser = typeof users.$inferInsert; //helper type that infers the type of the object passed to the insert function. 
                                                // This is useful for type safety.

export const chirps = pgTable("chirps" , {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
  body: text("body").notNull(),
  userId: uuid("userId").references(()=> users.id, {onDelete: 'cascade'}).notNull(),
});

export type NewChirp = typeof chirps.$inferInsert;