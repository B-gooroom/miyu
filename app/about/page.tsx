import { Footer, Header } from "../components/site-chrome";
import { eyebrow, pageShell } from "../lib/styles";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className={`${pageShell} pt-[70px]`}>
        <header className="mb-7 max-w-[680px]">
          <p className={eyebrow}>ABOUT</p>
          <h1 className="my-2 mb-3 text-[34px] tracking-normal text-[var(--navy)]">MIYU SENSEI</h1>
          <p className="text-[15px] leading-[1.8] text-[var(--muted)]">교재 문장만으로는 닿기 어려운 실제 일본어를, 매일의 뉴스로 차분하게 쌓아가는 학습 공간입니다.</p>
        </header>
        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-[var(--line)] p-[22px]">
            <h2 className="mb-4 text-[15px] font-bold tracking-normal text-[var(--navy)]">학습 방식</h2>
            <p className="m-0 text-sm leading-[1.8] text-[var(--muted)]">뉴스 원문을 단어, 문법, 해석, 정리노트로 나누어 한 페이지에서 완결되는 학습 흐름을 제공합니다.</p>
          </div>
          <div className="rounded-lg border border-[var(--line)] p-[22px]">
            <h2 className="mb-4 text-[15px] font-bold tracking-normal text-[var(--navy)]">대상 학습자</h2>
            <p className="m-0 text-sm leading-[1.8] text-[var(--muted)]">일본 유학 준비생, 실무 일본어 학습자, JLPT 준비생, 일본 시사와 문화에 관심 있는 학습자를 위한 사이트입니다.</p>
          </div>
          <div className="rounded-lg border border-[var(--line)] p-[22px]">
            <h2 className="mb-4 text-[15px] font-bold tracking-normal text-[var(--navy)]">브랜드 톤</h2>
            <p className="m-0 text-sm leading-[1.8] text-[var(--muted)]">전문적이고 학술적인 매거진 톤을 바탕으로, 과하지 않은 일본적 미감과 높은 본문 가독성을 지향합니다.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
