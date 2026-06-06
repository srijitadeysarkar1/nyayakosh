import { Router, type IRouter } from "express";
import { desc, eq } from "drizzle-orm";
import { db, newsArticlesTable, insertNewsArticleSchema } from "@workspace/db";

const router: IRouter = Router();

function requireAdmin(req: any, res: any, next: any) {
  const auth = req.headers["authorization"] ?? "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  const adminToken = process.env.ADMIN_TOKEN;
  if (!adminToken || token !== adminToken) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
}

// GET /api/news — public, returns published articles newest-first
router.get("/news", async (req, res) => {
  const limit = Math.min(parseInt((req.query.limit as string) ?? "50", 10), 100);
  const articles = await db
    .select()
    .from(newsArticlesTable)
    .where(eq(newsArticlesTable.published, true))
    .orderBy(desc(newsArticlesTable.createdAt))
    .limit(limit);
  res.json({ articles });
});

// POST /api/news — admin only
router.post("/news", requireAdmin, async (req, res) => {
  const parsed = insertNewsArticleSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [article] = await db
    .insert(newsArticlesTable)
    .values(parsed.data)
    .returning();
  res.status(201).json(article);
});

// DELETE /api/news/:id — admin only
router.delete("/news/:id", requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  const [deleted] = await db
    .delete(newsArticlesTable)
    .where(eq(newsArticlesTable.id, id))
    .returning();
  if (!deleted) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json({ ok: true });
});

export default router;
