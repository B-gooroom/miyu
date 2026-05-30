import Link from "next/link";
import { ArticleDetail } from "../../components/article-detail";
import { Footer, Header } from "../../components/site-chrome";
import { articles, featuredArticle } from "../../data";

export default async function ArticlePage({ params }: PageProps<"/news/[slug]">) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug) ?? featuredArticle;
  const currentIndex = articles.findIndex((item) => item.slug === article.slug);
  const previous = articles[currentIndex + 1];
  const next = articles[currentIndex - 1];

  return (
    <>
      <Header />
      <main className="article-page">
        <ArticleDetail article={article} />
        <nav className="prev-next" aria-label="previous and next articles">
          {previous ? (
            <Link href={`/news/${previous.slug}`}>
              <span>이전 기사</span>
              <strong>{previous.titleKo}</strong>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link href={`/news/${next.slug}`}>
              <span>다음 기사</span>
              <strong>{next.titleKo}</strong>
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
