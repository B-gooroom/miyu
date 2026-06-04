import Image from "next/image";
import Link from "next/link";
import { ArticleCard } from "./components/article-card";
import { Footer, Header } from "./components/site-chrome";
import { articles, featuredArticle } from "./data";
import { eyebrow, pageShell, sectionHeading } from "./lib/styles";

export default function Home() {
  const recent = articles.slice(1, 5);

  return (
    <>
      <Header />
      <main>
        <section className="relative flex min-h-[min(130px,20vh)] items-end overflow-hidden px-12 py-[52px]">
          <Image
            alt="Japanese study desk with newspaper and notes"
            className="object-cover"
            fill
            priority
            sizes="100vw"
            src="/images/miyu-hero.png"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,25,42,0.82),rgba(20,25,42,0.34),rgba(20,25,42,0.12))]" />
          <div className="relative w-[min(760px,100%)] text-white">
            <p lang="ja" className="mb-3.5 text-xl font-semibold text-[#f3d992]">
              毎日のニュースで学ぶ
            </p>
            <h1 className="mb-[30px] max-w-[420px] text-[42px] font-semibold leading-[1.18] tracking-normal text-white">
              매일 한 편의 일본 뉴스로, 살아있는 일본어를 만나다
            </h1>
            <Link
              className="inline-flex min-h-11 items-center rounded-lg border border-[var(--gold)] bg-[var(--gold)] px-[18px] text-xl font-semibold text-white"
              href={`/news/${featuredArticle.slug}`}
            >
              오늘의 기사 학습하기
            </Link>
          </div>
        </section>

        <section className={`${pageShell} grid gap-7 py-[72px] pb-11 md:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]`}>
          <div>
            <p className={eyebrow}>TODAY</p>
            <h2 className={sectionHeading}>오늘의 기사</h2>
            <ArticleCard article={featuredArticle} featured />
          </div>
          <aside className="border-t border-[var(--line)] pt-7 md:border-l md:border-t-0 md:pl-7 md:pt-0">
            <p className={eyebrow}>RECENT</p>
            <h2 className={sectionHeading}>최근 기사</h2>
            <div className="grid gap-3">
              {recent.map((article) => (
                <ArticleCard article={article} key={article.slug} />
              ))}
            </div>
          </aside>
        </section>

        <section className="grid border-y border-[var(--line)] bg-[var(--soft)] md:grid-cols-3">
          <div className="grid gap-1 px-5 py-7 text-center">
            <strong className="text-2xl text-[var(--navy)]">128</strong>
            <span className="text-xs text-[var(--muted)]">누적 뉴스 학습</span>
          </div>
          <div className="grid gap-1 px-5 py-7 text-center">
            <strong className="text-2xl text-[var(--navy)]">N5-N1</strong>
            <span className="text-xs text-[var(--muted)]">전 레벨 대응</span>
          </div>
          <div className="grid gap-1 px-5 py-7 text-center">
            <strong className="text-2xl text-[var(--navy)]">5분</strong>
            <span className="text-xs text-[var(--muted)]">하루 기사 루틴</span>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
