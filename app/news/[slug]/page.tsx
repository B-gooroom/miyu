import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleDetail } from "../../components/article-detail";
import { Footer, Header } from "../../components/site-chrome";
import { getPublishedArticleBySlug, getPublishedArticles } from "../../lib/articles";

export default async function ArticlePage({ params }: PageProps<"/news/[slug]">) {
  const { slug } = await params;
  const [article, articles] = await Promise.all([getPublishedArticleBySlug(slug), getPublishedArticles()]);

  if (!article) {
    notFound();
  }

  const currentIndex = articles.findIndex((item) => item.slug === article.slug);
  const previous = articles[currentIndex + 1];
  const next = articles[currentIndex - 1];

  return (
    <>
      <Header />
      <main className="mx-auto w-[min(1120px,calc(100%-40px))] pt-7">
        <ArticleDetail article={article} />
        <nav className="mx-auto mt-[30px] grid w-[min(758px,100%)] gap-3 md:grid-cols-2" aria-label="previous and next articles">
          {previous ? (
            <Link className="rounded-lg border border-[var(--line)] p-[18px]" href={`/news/${previous.slug}`}>
              <span className="mb-2 block text-[11px] font-extrabold text-[var(--gold)]">이전 기사</span>
              <strong className="text-sm text-[var(--navy)]">{previous.titleKo}</strong>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link className="rounded-lg border border-[var(--line)] p-[18px]" href={`/news/${next.slug}`}>
              <span className="mb-2 block text-[11px] font-extrabold text-[var(--gold)]">다음 기사</span>
              <strong className="text-sm text-[var(--navy)]">{next.titleKo}</strong>
            </Link>
          ) : (
            <div />
          )}
        </nav>
      </main>
      <Footer />
    </>
  );
}
