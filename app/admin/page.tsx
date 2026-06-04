import Link from "next/link";
import { redirect } from "next/navigation";
import { Footer, Header } from "../components/site-chrome";
import { createSupabaseServerClient, hasSupabaseConfig, isAllowedAdmin } from "../lib/supabase";
import { eyebrow, goldButton, outlineButton } from "../lib/styles";
import { logoutAdmin } from "./actions";
import { AdminSetupNeeded } from "./setup-needed";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ created?: string; error?: string; updated?: string }>;
}) {
  if (!hasSupabaseConfig()) {
    return <AdminSetupNeeded />;
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !isAllowedAdmin(user.email)) {
    redirect("/admin/login");
  }

  const { data: articles } = await supabase
    .from("articles")
    .select("id, slug, status, published_at, title_ja, title_ko")
    .order("published_at", { ascending: false })
    .limit(8);
  const { created, error, updated } = await searchParams;

  return (
    <>
      <Header />
      <main className="mx-auto w-[min(1040px,calc(100%-40px))] pt-16">
        <section className="mb-5 flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className={eyebrow}>ADMIN</p>
            <h1 className="my-2 mb-2.5 text-[32px] leading-[1.25] tracking-normal text-[var(--navy)]">
              뉴스 관리
            </h1>
            <p className="m-0 text-sm leading-[1.7] text-[var(--muted)]">
              {user.email} 계정으로 로그인 중입니다.
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <Link
              className={`${goldButton} min-h-9 px-4`}
              href="/admin/articles/new"
            >
              새 기사 등록
            </Link>
            <form action={logoutAdmin}>
              <button
                className={`${outlineButton} min-h-9 px-4 text-sm font-bold`}
                type="submit"
              >
                로그아웃
              </button>
            </form>
          </div>
        </section>

        {created ? (
          <p className="mb-4 rounded-lg border border-green-200 bg-green-50 px-3 py-2.5 text-[13px] leading-[1.7] text-green-800">
            {created} 기사를 저장했습니다.
          </p>
        ) : null}
        {updated ? (
          <p className="mb-4 rounded-lg border border-green-200 bg-green-50 px-3 py-2.5 text-[13px] leading-[1.7] text-green-800">
            {updated} 기사 상태를 변경했습니다.
          </p>
        ) : null}
        {error ? (
          <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-[13px] leading-[1.7] text-red-800">
            기사 상태를 변경하지 못했습니다. 다시 시도해주세요.
          </p>
        ) : null}

        <section className="rounded-lg border border-[var(--line)] bg-white p-[clamp(20px,4vw,30px)]">
          <h2 className="mb-4 text-base text-miyu-navy">최근 등록 기사</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[13px]">
              <thead>
                <tr className="flex items-center gap-2">
                  <th className="w-[120px] shrink-0 border-b border-[var(--line)] p-3 text-left text-xs text-[var(--navy)]">
                    날짜
                  </th>
                  <th className="min-w-0 flex-1 border-b border-[var(--line)] p-3 text-left text-xs text-[var(--navy)]">
                    제목
                  </th>
                  <th className="w-[72px] shrink-0 border-b border-[var(--line)] p-3 text-left text-xs text-[var(--navy)]">
                    상태
                  </th>
                  <th className="w-[200px] shrink-0 border-b border-[var(--line)] p-3 text-left text-xs text-[var(--navy)]">
                    Slug
                  </th>
                  <th className="w-[84px] shrink-0 border-b border-[var(--line)] p-3 text-left text-xs text-[var(--navy)]">
                    관리
                  </th>
                </tr>
              </thead>
              <tbody>
                {(articles ?? []).map((article) => (
                  <tr key={article.id} className="flex items-center gap-2">
                    <td className="w-[120px] shrink-0 border-b border-[var(--line)] p-3 align-top">
                      {article.published_at}
                    </td>
                    <td className="min-w-0 flex-1 border-b border-[var(--line)] p-3">
                      <strong className="block">{article.title_ja}</strong>
                    </td>
                    <td className="w-[72px] shrink-0 border-b border-[var(--line)] p-3">
                      {article.status === "draft" ? "미등록" : "등록"}
                    </td>
                    <td className="w-[200px] shrink-0 border-b border-[var(--line)] p-3">
                      {article.slug}
                    </td>
                    <td className="w-[84px] shrink-0 border-b border-[var(--line)] p-3">
                      <Link
                        className={`${outlineButton} inline-flex min-h-8 items-center px-3`}
                        href={`/admin/articles/${article.id}/edit`}
                      >
                        관리
                      </Link>
                    </td>
                  </tr>
                ))}
                {!articles?.length ? (
                  <tr>
                    <td
                      className="border-b border-[var(--line)] p-3"
                      colSpan={5}
                    >
                      아직 등록된 기사가 없습니다.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
