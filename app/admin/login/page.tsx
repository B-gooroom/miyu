import { redirect } from "next/navigation";
import { Footer, Header } from "../../components/site-chrome";
import { createSupabaseServerClient, isAllowedAdmin } from "../../lib/supabase";
import { eyebrow } from "../../lib/styles";
import { LoginForm } from "./login-form";

export default async function AdminLoginPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user && isAllowedAdmin(user.email)) {
    redirect("/admin");
  }

  return (
    <>
      <Header />
      <main className="mx-auto w-[min(1040px,calc(100%-40px))] pt-16">
        <section className="rounded-lg border border-[var(--line)] bg-white p-[clamp(20px,4vw,30px)]">
          <p className={eyebrow}>ADMIN</p>
          <h1 className="my-2 mb-2.5 text-[32px] leading-[1.25] tracking-normal text-[var(--navy)]">관리자 로그인</h1>
          <p className="mb-4 text-sm leading-[1.7] text-[var(--muted)]">등록된 관리자 계정으로 로그인합니다.</p>
          <LoginForm />
        </section>
      </main>
      <Footer />
    </>
  );
}
