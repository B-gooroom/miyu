import Image from "next/image";
import Link from "next/link";
import { ArticleCard } from "./components/article-card";
import { Footer, Header } from "./components/site-chrome";
import { articles, featuredArticle } from "./data";

export default function Home() {
  const recent = articles.slice(1, 5);

  return (
    <>
      <Header />
      <main>
        <section className="hero">
          <Image
            alt="Japanese study desk with newspaper and notes"
            className="hero-image"
            fill
            priority
            sizes="100vw"
            src="/images/miyu-hero.png"
          />
          <div className="hero-overlay" />
          <div className="hero-content">
            <p lang="ja">毎日のニュースで学ぶ</p>
            <h1>매일 한 편의 일본 뉴스로, 살아있는 일본어를 만나다</h1>
            <Link className="primary-link" href={`/news/${featuredArticle.slug}`}>
              오늘의 기사 학습하기
            </Link>
          </div>
        </section>

        <section className="home-grid content-band">
          <div>
            <p className="eyebrow">TODAY</p>
            <h2>오늘의 기사</h2>
            <ArticleCard article={featuredArticle} featured />
          </div>
          <aside className="recent-panel">
            <p className="eyebrow">RECENT</p>
            <h2>최근 기사</h2>
            <div className="recent-list">
              {recent.map((article) => (
                <ArticleCard article={article} key={article.slug} />
              ))}
            </div>
          </aside>
        </section>

        <section className="stats-band">
          <div>
            <strong>128</strong>
            <span>누적 뉴스 학습</span>
          </div>
          <div>
            <strong>N5-N1</strong>
            <span>전 레벨 대응</span>
          </div>
          <div>
            <strong>5분</strong>
            <span>하루 기사 루틴</span>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
