import Link from "next/link";
import type { NewsArticle } from "../data";
import { cx, eyebrow } from "../lib/styles";

export function ArticleCard({
  article,
  featured = false,
}: {
  article: NewsArticle;
  featured?: boolean;
}) {
  return (
    <Link
      className={cx(
        "block rounded-lg border border-[var(--line)] bg-white p-[18px] transition duration-150 hover:-translate-y-0.5 hover:border-[rgba(184,134,11,0.55)]",
        featured && "min-h-[280px] p-[30px]",
      )}
      href={`/news/${article.slug}`}
    >
      <span className={eyebrow}>
        {article.date} · {article.category} · {article.level}
      </span>
      <h3 className={cx("my-2 mt-3.5 text-[19px] leading-[1.45] tracking-normal text-[var(--navy)]", featured && "text-[28px]")}>
        {article.titleJa}
      </h3>
      <p className="mb-3 text-[13px] font-semibold leading-[1.75] text-[var(--text)]">{article.titleKo}</p>
      <p className="m-0 text-[13px] leading-[1.75] text-[var(--muted)]">{article.summary}</p>
    </Link>
  );
}
