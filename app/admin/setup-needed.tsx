import { Footer, Header } from "../components/site-chrome";
import { eyebrow } from "../lib/styles";

export function AdminSetupNeeded() {
  return (
    <>
      <Header />
      <main className="mx-auto w-[min(760px,calc(100%-40px))] pt-16">
        <section className="rounded-lg border border-[var(--line)] bg-white p-[clamp(20px,4vw,30px)]">
          <p className={eyebrow}>ADMIN</p>
          <h1 className="my-2 mb-2.5 text-[32px] leading-[1.25] tracking-normal text-[var(--navy)]">
            Supabase 설정이 필요합니다
          </h1>
          <p className="mb-4 text-sm leading-[1.8] text-[var(--muted)]">
            Vercel 프로젝트 환경변수에 아래 값을 추가한 뒤 다시 배포해주세요.
          </p>
          <ul className="grid gap-2 rounded-lg bg-[var(--soft)] p-4 text-sm font-semibold text-[var(--navy)]">
            <li>NEXT_PUBLIC_SUPABASE_URL</li>
            <li>NEXT_PUBLIC_SUPABASE_ANON_KEY</li>
            <li>ADMIN_EMAILS</li>
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
