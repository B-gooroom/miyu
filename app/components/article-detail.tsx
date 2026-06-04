"use client";

import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import type { NewsArticle } from "../data";
import { cx, outlineButton, sectionHeading } from "../lib/styles";

const sections = [
  ["original", "① 원문"],
  ["words", "② 핵심 단어"],
  ["grammar", "③ 문법·표현"],
  ["translation", "④ 전문 해석"],
  ["notes", "⑤ 정리노트"],
] as const;

function RubyText({
  word,
  reading,
  show,
}: {
  word: string;
  reading: string;
  show: boolean;
}) {
  return show ? (
    <ruby>
      {word}
      <rt>{reading}</rt>
    </ruby>
  ) : (
    <>{word}</>
  );
}

export function ArticleDetail({ article }: { article: NewsArticle }) {
  const [showRuby, setShowRuby] = useState(true);
  const [fontScale, setFontScale] = useState(1);
  const [noteTab, setNoteTab] = useState<"words" | "grammar">("words");
  const [saved, setSaved] = useState(false);

  const noteRows = useMemo(() => {
    if (noteTab === "words") {
      return article.words.map((word, index) => ({
        index: index + 1,
        ja: `${word.ja}（${word.furigana}）`,
        ko: word.ko,
      }));
    }

    return article.grammar.map((item, index) => ({
      index: index + 1,
      ja: item.pattern,
      ko: item.meaning,
    }));
  }, [article.grammar, article.words, noteTab]);

  const copyNotes = async () => {
    const text = noteRows.map((row) => `${row.index}. ${row.ja} - ${row.ko}`).join("\n");
    await navigator.clipboard?.writeText(text);
  };

  return (
    <>
      <div className="mx-auto mb-[18px] w-[min(758px,100%)] text-xs text-[var(--muted)]">HOME › 뉴스 학습 › 2026년 5월</div>

      <article className="mx-auto w-[min(758px,100%)]" style={{ "--lesson-scale": fontScale } as CSSProperties}>
        <header className="border-b border-[var(--line)] pb-[26px]">
          <p className="text-[11px] font-extrabold tracking-normal text-[var(--gold)]">{article.date.replaceAll(".", " · ")} · {article.weekday}</p>
          <h1 className="my-2 mb-2.5 text-[27px] font-semibold leading-[1.35] tracking-normal text-[var(--navy)] md:text-[34px]">{article.titleJa}</h1>
          <p className="mb-[18px] text-[15px] text-[var(--muted)]">{article.titleKo}</p>
          <div className="mb-3.5 flex flex-wrap gap-2" aria-label="article actions">
            <button className={outlineButton} type="button" onClick={() => setSaved((value) => !value)}>
              {saved ? "✓ 저장됨" : "☆ 저장"}
            </button>
            <button className={outlineButton} type="button" onClick={() => navigator.share?.({ title: article.titleKo, url: location.href })}>
              ↗ 공유
            </button>
            <button className={outlineButton} type="button" onClick={() => setFontScale((value) => Math.max(0.9, value - 0.08))}>
              A-
            </button>
            <button className={outlineButton} type="button" onClick={() => setFontScale((value) => Math.min(1.18, value + 0.08))}>
              A+
            </button>
            <button className={outlineButton} type="button" onClick={() => setShowRuby((value) => !value)}>
              {showRuby ? "후리가나 ON" : "후리가나 OFF"}
            </button>
          </div>
          <a className="text-xs font-bold text-[var(--gold)]" href={article.sourceUrl} target="_blank" rel="noreferrer">
            출처: {article.source}
          </a>
        </header>

        <nav className="sticky top-[73px] z-10 flex gap-2 overflow-x-auto border-b border-[var(--line)] bg-white/95 py-3 backdrop-blur-md" aria-label="lesson sections">
          {sections.map(([id, label]) => (
            <a className="shrink-0 rounded-full border border-[var(--line)] px-3 py-2 text-xs font-bold text-[var(--navy)] hover:border-[var(--gold)] hover:text-[var(--gold)]" href={`#${id}`} key={id}>
              {label}
            </a>
          ))}
        </nav>

        <section className="scroll-mt-[140px] border-b border-[var(--line)] border-l-[3px] border-l-[var(--gold)] py-[38px] pl-5" id="original">
          <h2 className={sectionHeading}>① 원문</h2>
          <p className="m-0 text-[calc(16px*var(--lesson-scale))] leading-[1.95]">
            日本各地で、<span className="group relative cursor-help border-b border-dashed border-[var(--gold)] bg-[linear-gradient(transparent_58%,rgba(184,134,11,0.24)_58%)]"><RubyText word="地方" reading="ちほう" show={showRuby} /><span className="invisible absolute bottom-[105%] left-0 w-max max-w-[180px] rounded-md border border-[var(--line)] bg-white px-2.5 py-2 text-xs text-[var(--text)] shadow-[0_10px_24px_rgba(20,25,42,0.12)] group-hover:visible">지방, 지역</span></span>
            <RubyText word="観光" reading="かんこう" show={showRuby} />を学びの旅として見直す動きが広がっています。
            参加者は名所を訪れるだけでなく、地域の人々から歴史や生活文化を学びます。
            自治体はこうした<span className="group relative cursor-help border-b border-dashed border-[var(--gold)] bg-[linear-gradient(transparent_58%,rgba(184,134,11,0.24)_58%)]"><RubyText word="取り組み" reading="とりくみ" show={showRuby} /><span className="invisible absolute bottom-[105%] left-0 w-max max-w-[180px] rounded-md border border-[var(--line)] bg-white px-2.5 py-2 text-xs text-[var(--text)] shadow-[0_10px_24px_rgba(20,25,42,0.12)] group-hover:visible">시도, 대처</span></span>
            を通じて、滞在時間の増加を期待しています。
          </p>
        </section>

        <section className="scroll-mt-[140px] border-b border-[var(--line)] py-[38px]" id="words">
          <h2 className={sectionHeading}>② 핵심 단어</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {article.words.map((word) => (
              <div className="rounded-lg border border-[var(--line)] p-4" key={word.ja}>
                <strong className="block text-lg text-[var(--navy)]">{word.ja}</strong>
                <span className="my-1.5 mb-2.5 block text-xs text-[var(--muted)]">{showRuby ? word.furigana : "후리가나 숨김"}</span>
                <p className="m-0 text-[calc(14px*var(--lesson-scale))] leading-[1.7] text-[var(--text)]">{word.ko}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="scroll-mt-[140px] border-b border-[var(--line)] py-[38px]" id="grammar">
          <h2 className={sectionHeading}>③ 문법·표현</h2>
          <div className="grid gap-3">
            {article.grammar.map((item) => (
              <div className="rounded-lg border border-[#ead9ae] bg-[#fff8e8] p-[18px]" key={item.pattern}>
                <strong className="text-lg text-[var(--gold)]">{item.pattern}</strong>
                <p className="m-0 text-[calc(14px*var(--lesson-scale))] leading-[1.7] text-[var(--text)]">{item.meaning}</p>
                <blockquote className="mt-3.5 border-l-[3px] border-[#d5d8df] pl-3 text-[calc(14px*var(--lesson-scale))] leading-[1.7] text-[var(--navy)]">
                  {item.exampleJa}
                  <span className="block text-[var(--muted)]">{item.exampleKo}</span>
                </blockquote>
              </div>
            ))}
          </div>
        </section>

        <section className="scroll-mt-[140px] border-b border-[var(--line)] py-[38px]" id="translation">
          <h2 className={sectionHeading}>④ 전문 해석</h2>
          <div className="grid gap-2.5">
            {article.sentences.map((sentence) => (
              <div className="grid gap-[18px] rounded-lg border border-[var(--line)] p-4 md:grid-cols-2" key={sentence.ja}>
                <p className="m-0 text-[calc(14px*var(--lesson-scale))] leading-[1.8] text-[var(--navy)]" lang="ja">{sentence.ja}</p>
                <p className="m-0 text-[calc(14px*var(--lesson-scale))] leading-[1.8]">{sentence.ko}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="scroll-mt-[140px] border-b border-[var(--line)] py-[38px]" id="notes">
          <div className="flex flex-col gap-3.5 md:flex-row md:items-center md:justify-between">
            <h2 className={sectionHeading}>⑤ 정리노트</h2>
            <div className="flex flex-wrap gap-2">
              <button className={cx(outlineButton, noteTab === "words" && "border-[var(--gold)] bg-[#fff8e8] text-[var(--gold)]")} type="button" onClick={() => setNoteTab("words")}>
                단어 정리 ({article.words.length})
              </button>
              <button className={cx(outlineButton, noteTab === "grammar" && "border-[var(--gold)] bg-[#fff8e8] text-[var(--gold)]")} type="button" onClick={() => setNoteTab("grammar")}>
                문법·표현 정리 ({article.grammar.length})
              </button>
            </div>
          </div>
          <div className="overflow-x-auto rounded-lg border border-[var(--line)]">
            <table className="w-full border-collapse text-[13px]">
              <thead>
                <tr>
                  <th className="w-[52px] border-b border-[var(--line)] bg-[var(--soft)] p-3 text-center text-left text-[var(--navy)]">#</th>
                  <th className="border-b border-[var(--line)] bg-[var(--soft)] p-3 text-left text-[var(--navy)]">일본어·후리가나</th>
                  <th className="border-b border-[var(--line)] bg-[var(--soft)] p-3 text-left text-[var(--navy)]">한국어</th>
                </tr>
              </thead>
              <tbody>
                {noteRows.map((row) => (
                  <tr key={row.ja}>
                    <td className="w-[52px] border-b border-[var(--line)] p-3 text-center">{row.index}</td>
                    <td className="border-b border-[var(--line)] p-3 text-left">{row.ja}</td>
                    <td className="border-b border-[var(--line)] p-3 text-left">{row.ko}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3.5 flex flex-wrap justify-end gap-2">
            <button className={outlineButton} type="button" onClick={copyNotes}>□ 복사</button>
            <button className={outlineButton} type="button" onClick={() => window.print()}>PDF</button>
            <button className={outlineButton} type="button" onClick={() => window.print()}>인쇄</button>
          </div>
        </section>
      </article>
    </>
  );
}
