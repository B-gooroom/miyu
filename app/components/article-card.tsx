import Link from "next/link";
import type { NewsArticle } from "../data";

export function ArticleCard({
  article,
  featured = false,
}: {
  article: NewsArticle;
  featured?: boolean;
}) {
  return (
    <Link className={featured ? "article-card featured" : "article-card"} href={`/news/${article.slug}`}>
      <span className="card-meta">
        {article.date} · {article.category} · {article.level}
      </span>
      <h3>{article.titleJa}</h3>
      <p className="card-subtitle">{article.titleKo}</p>
      <p>{article.summary}</p>
    </Link>
  );
}
