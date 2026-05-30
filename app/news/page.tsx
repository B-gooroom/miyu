import { ArticleCard } from "../components/article-card";
import { Footer, Header } from "../components/site-chrome";
import { articles } from "../data";

const categories = ["전체", "사회", "비즈니스", "문화", "유학", "생활"];

export default function NewsPage() {
  return (
    <>
      <Header />
      <main className="page-shell">
        <header className="page-heading">
          <p className="eyebrow">NEWS LESSONS</p>
          <h1>뉴스 학습</h1>
          <p>날짜 역순으로 쌓이는 일본어 뉴스 학습 아카이브입니다.</p>
        </header>
        <div className="filter-row" aria-label="category filters">
          {categories.map((category) => (
            <button className={category === "전체" ? "active" : ""} key={category} type="button">
              {category}
            </button>
          ))}
        </div>
        <section className="archive-month">
          <h2>2026년 5월</h2>
          <div className="archive-list">
            {articles.map((article) => (
              <ArticleCard article={article} key={article.slug} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
