import Link from "next/link";
import { redirect } from "next/navigation";
import { Footer, Header } from "../../../components/site-chrome";
import {
  createSupabaseServerClient,
  hasSupabaseConfig,
  isAllowedAdmin,
} from "../../../lib/supabase";
import { eyebrow, outlineButton } from "../../../lib/styles";
import { AdminSetupNeeded } from "../../setup-needed";
import { ArticleForm } from "./article-form";

export default async function NewArticlePage() {
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

  return (
    <>
      <Header />
      <main className="mx-auto w-[min(1040px,calc(100%-40px))] pt-16">
        <section className="mb-5 flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className={eyebrow}>ADMIN</p>
            <h1 className="my-2 mb-2.5 text-[32px] leading-[1.25] tracking-normal text-[var(--navy)]">
              새 기사 등록
            </h1>
            <p className="m-0 text-sm leading-[1.7] text-[var(--muted)]">
              뉴스 원문과 학습 데이터를 한 번에 저장합니다.
            </p>
          </div>
          <Link
            className={`${outlineButton} min-h-9 px-4 py-2.5`}
            href="/admin"
          >
            관리 홈
          </Link>
        </section>
        <section className="rounded-lg border border-[var(--line)] bg-white p-[clamp(20px,4vw,30px)]">
          <ArticleForm />
        </section>
      </main>
      <Footer />
    </>
  );
}
