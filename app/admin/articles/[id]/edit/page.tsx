import Link from "next/link";
import { redirect } from "next/navigation";
import { Footer, Header } from "../../../../components/site-chrome";
import { createSupabaseServerClient, hasSupabaseConfig, isAllowedAdmin } from "../../../../lib/supabase";
import { eyebrow, goldButton, outlineButton } from "../../../../lib/styles";
import { updateArticleStatus } from "../../../actions";
import { AdminSetupNeeded } from "../../../setup-needed";

export default async function EditArticlePage({
  params,
}: PageProps<"/admin/articles/[id]/edit">) {
  if (!hasSupabaseConfig()) {
    return <AdminSetupNeeded />;
  }

  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !isAllowedAdmin(user.email)) {
    redirect("/admin/login");
  }

  const { data: article } = await supabase
    .from("articles")
    .select("id, slug, status, published_at, title_ja, title_ko, summary")
    .eq("id", id)
    .eq("author_id", user.id)
    .single();

  if (!article) {
    redirect("/admin");
  }

  return (
    <>
      <Header />
      <main className="mx-auto w-[min(760px,calc(100%-40px))] pt-16">
        <section className="mb-5 flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className={eyebrow}>ADMIN</p>
            <h1 className="my-2 mb-2.5 text-[32px] leading-[1.25] tracking-normal text-[var(--navy)]">
              기사 관리
            </h1>
            <p className="m-0 text-sm leading-[1.7] text-[var(--muted)]">
              미등록 기사를 등록하거나 다시 미등록 상태로 바꿀 수 있습니다.
            </p>
          </div>
          <Link className={`${outlineButton} inline-flex min-h-9 items-center px-4`} href="/admin">
            목록으로
          </Link>
        </section>

        <section className="rounded-lg border border-[var(--line)] bg-white p-[clamp(20px,4vw,30px)]">
          <div className="mb-5 border-b border-[var(--line)] pb-5">
            <p className="mb-2 text-xs font-bold text-[var(--gold)]">
              {article.published_at} · {article.slug}
            </p>
            <h2 className="mb-2 text-xl font-bold text-[var(--navy)]">{article.title_ja}</h2>
            <p className="m-0 text-sm leading-[1.7] text-[var(--muted)]">{article.title_ko}</p>
            {article.summary ? (
              <p className="mt-3 text-sm leading-[1.7] text-[var(--text)]">{article.summary}</p>
            ) : null}
          </div>

          <form action={updateArticleStatus} className="grid gap-4">
            <input name="article_id" type="hidden" value={article.id} />
            <label className="grid gap-2 text-xs font-extrabold text-[var(--navy)]">
              상태
              <select
                className="w-full rounded-lg border border-[var(--line)] bg-white px-3 py-2.5 text-sm font-medium text-[var(--text)] outline-none focus:border-[rgba(184,134,11,0.7)] focus:shadow-[0_0_0_3px_rgba(184,134,11,0.12)]"
                defaultValue={article.status}
                name="status"
              >
                <option value="draft">미등록</option>
                <option value="published">등록</option>
              </select>
            </label>
            <button className={goldButton} type="submit">
              상태 저장
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}
