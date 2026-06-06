import { pgTable, serial, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const newsArticlesTable = pgTable("news_articles", {
  id: serial("id").primaryKey(),
  date: text("date").notNull(),
  category: text("category").notNull(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  tag: text("tag").notNull(),
  tagColor: text("tag_color").notNull().default("#FF9933"),
  published: boolean("published").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertNewsArticleSchema = createInsertSchema(newsArticlesTable).omit({
  id: true,
  createdAt: true,
});

export type InsertNewsArticle = z.infer<typeof insertNewsArticleSchema>;
export type NewsArticle = typeof newsArticlesTable.$inferSelect;
