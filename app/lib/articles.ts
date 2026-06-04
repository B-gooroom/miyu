import type { NewsArticle } from "../data";
import { createSupabaseServerClient, hasSupabaseConfig } from "./supabase";

type ArticleRow = {
  body_ja: string;
  category: string;
  level: string;
  published_at: string;
  slug: string;
  source_name: string;
  source_url: string;
  status: string;
  summary: string;
  title_ja: string;
  title_ko: string;
};

function formatDate(date: string) {
  return date.replaceAll("-", ".");
}

function weekdayOf(date: string) {
  const weekday = new Intl.DateTimeFormat("en-US", { weekday: "short", timeZone: "Asia/Seoul" }).format(new Date(`${date}T00:00:00+09:00`));
  return weekday.toUpperCase();
}

function toArticleSummary(row: ArticleRow): NewsArticle {
  return {
    category: row.category,
    date: formatDate(row.published_at),
    grammar: [],
    level: row.level,
    sentences: [],
    slug: row.slug,
    source: row.source_name,
    sourceUrl: row.source_url,
    summary: row.summary,
    titleJa: row.title_ja,
    titleKo: row.title_ko,
    weekday: weekdayOf(row.published_at),
    words: [],
  };
}

export async function getPublishedArticles(category?: string) {
  if (!hasSupabaseConfig()) {
    return [];
  }

  const supabase = await createSupabaseServerClient();
  let query = supabase
    .from("articles")
    .select("body_ja, category, level, published_at, slug, source_name, source_url, status, summary, title_ja, title_ko")
    .eq("status", "published");

  if (category) {
    query = query.eq("category", category);
  }

  const { data, error } = await query.order("published_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map((row) => toArticleSummary(row));
}

export async function getPublishedArticleBySlug(slug: string) {
  if (!hasSupabaseConfig()) {
    return null;
  }

  const supabase = await createSupabaseServerClient();
  const { data: article, error } = await supabase
    .from("articles")
    .select("id, body_ja, category, level, published_at, slug, source_name, source_url, status, summary, title_ja, title_ko")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error || !article) {
    return null;
  }

  const [{ data: words }, { data: grammar }, { data: translations }] = await Promise.all([
    supabase.from("article_words").select("ja, furigana, ko").eq("article_id", article.id).order("sort_order"),
    supabase
      .from("article_grammar")
      .select("pattern, meaning, example_ja, example_ko")
      .eq("article_id", article.id)
      .order("sort_order"),
    supabase.from("article_translations").select("ja, ko").eq("article_id", article.id).order("sort_order"),
  ]);

  return {
    ...toArticleSummary(article),
    grammar: (grammar ?? []).map((item) => ({
      exampleJa: item.example_ja,
      exampleKo: item.example_ko,
      meaning: item.meaning,
      pattern: item.pattern,
    })),
    sentences: (translations ?? []).map((item) => ({
      ja: item.ja,
      ko: item.ko,
    })),
    words: (words ?? []).map((item) => ({
      furigana: item.furigana,
      ja: item.ja,
      ko: item.ko,
    })),
  } satisfies NewsArticle;
}
