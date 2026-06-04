import Link from "next/link";
import { ArticleCard } from "../components/article-card";
import { Footer, Header } from "../components/site-chrome";
import { getPublishedArticles } from "../lib/articles";
import {
  cx,
  eyebrow,
  outlineButton,
  pageShell,
  sectionHeading,
} from "../lib/styles";

const categories = ["전체", "사회", "비즈니스", "문화", "유학", "생활"];

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const activeCategory = categories.includes(category ?? "")
    ? category
    : "전체";
  const filterCategory = activeCategory === "전체" ? undefined : activeCategory;
  const articles = await getPublishedArticles(filterCategory);

  console.log("activeCategory", activeCategory);

  return (
    <>
      <Header />
      <main className={`${pageShell} pt-[70px]`}>
        <header className="mb-7 max-w-[680px]">
          <p className={eyebrow}>NEWS LESSONS</p>
          <h1 className="my-2 mb-3 text-[34px] tracking-normal text-[var(--navy)]">
            뉴스 학습
          </h1>
          <p className="text-[15px] leading-[1.8] text-[var(--muted)]">
            날짜 역순으로 쌓이는 일본어 뉴스 학습 아카이브입니다.
          </p>
        </header>
        <div
          className="flex gap-2 overflow-x-auto pb-5"
          aria-label="category filters"
        >
          {categories.map((category) => (
            <Link
              className={cx(
                outlineButton,
                "inline-flex items-center",
                category === activeCategory &&
                  "border-miyu-gold bg-miyu-soft text-[#b8860b]",
              )}
              href={
                category === "전체"
                  ? "/news"
                  : `/news?category=${encodeURIComponent(category)}`
              }
              key={category}
            >
              {category}
            </Link>
          ))}
        </div>
        <section className="pt-2.5">
          <h2 className={sectionHeading}>
            {activeCategory === "전체"
              ? "등록된 뉴스"
              : `${activeCategory} 뉴스`}
          </h2>
          <div className="grid gap-3">
            {articles.map((article) => (
              <ArticleCard article={article} key={article.slug} />
            ))}
            {!articles.length ? (
              <div className="rounded-lg border border-[var(--line)] bg-white p-6 text-sm leading-[1.7] text-[var(--muted)]">
                {activeCategory === "전체"
                  ? "아직 등록된 뉴스가 없습니다. 관리자 페이지에서 기사를 등록해 주세요."
                  : `${activeCategory} 카테고리에 등록된 뉴스가 없습니다.`}
              </div>
            ) : null}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
