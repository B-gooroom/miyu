"use client";

import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import type { NewsArticle } from "../data";

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
      <div className="breadcrumb">HOME › 뉴스 학습 › 2026년 5월</div>

      <article className="lesson-shell" style={{ "--lesson-scale": fontScale } as CSSProperties}>
        <header className="lesson-header">
          <p className="date-line">{article.date.replaceAll(".", " · ")} · {article.weekday}</p>
          <h1>{article.titleJa}</h1>
          <p>{article.titleKo}</p>
          <div className="lesson-actions" aria-label="article actions">
            <button type="button" onClick={() => setSaved((value) => !value)}>
              {saved ? "✓ 저장됨" : "☆ 저장"}
            </button>
            <button type="button" onClick={() => navigator.share?.({ title: article.titleKo, url: location.href })}>
              ↗ 공유
            </button>
            <button type="button" onClick={() => setFontScale((value) => Math.max(0.9, value - 0.08))}>
              A-
            </button>
            <button type="button" onClick={() => setFontScale((value) => Math.min(1.18, value + 0.08))}>
              A+
            </button>
            <button type="button" onClick={() => setShowRuby((value) => !value)}>
              {showRuby ? "후리가나 ON" : "후리가나 OFF"}
            </button>
          </div>
          <a className="source-link" href={article.sourceUrl} target="_blank" rel="noreferrer">
            출처: {article.source}
          </a>
        </header>

        <nav className="chapter-nav" aria-label="lesson sections">
          {sections.map(([id, label]) => (
            <a href={`#${id}`} key={id}>
              {label}
            </a>
          ))}
        </nav>

        <section className="lesson-section original-section" id="original">
          <h2>① 원문</h2>
          <p className="jp-text">
            日本各地で、<span className="keyword" data-tip="지방, 지역"><RubyText word="地方" reading="ちほう" show={showRuby} /></span>
            <RubyText word="観光" reading="かんこう" show={showRuby} />を学びの旅として見直す動きが広がっています。
            参加者は名所を訪れるだけでなく、地域の人々から歴史や生活文化を学びます。
            自治体はこうした<span className="keyword" data-tip="시도, 대처"><RubyText word="取り組み" reading="とりくみ" show={showRuby} /></span>
            を通じて、滞在時間の増加を期待しています。
          </p>
        </section>

        <section className="lesson-section" id="words">
          <h2>② 핵심 단어</h2>
          <div className="word-grid">
            {article.words.map((word) => (
              <div className="word-card" key={word.ja}>
                <strong>{word.ja}</strong>
                <span>{showRuby ? word.furigana : "후리가나 숨김"}</span>
                <p>{word.ko}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="lesson-section" id="grammar">
          <h2>③ 문법·표현</h2>
          <div className="grammar-stack">
            {article.grammar.map((item) => (
              <div className="grammar-box" key={item.pattern}>
                <strong>{item.pattern}</strong>
                <p>{item.meaning}</p>
                <blockquote>
                  {item.exampleJa}
                  <span>{item.exampleKo}</span>
                </blockquote>
              </div>
            ))}
          </div>
        </section>

        <section className="lesson-section" id="translation">
          <h2>④ 전문 해석</h2>
          <div className="translation-list">
            {article.sentences.map((sentence) => (
              <div className="translation-row" key={sentence.ja}>
                <p lang="ja">{sentence.ja}</p>
                <p>{sentence.ko}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="lesson-section" id="notes">
          <div className="section-title-row">
            <h2>⑤ 정리노트</h2>
            <div className="note-tabs">
              <button className={noteTab === "words" ? "active" : ""} type="button" onClick={() => setNoteTab("words")}>
                단어 정리 ({article.words.length})
              </button>
              <button className={noteTab === "grammar" ? "active" : ""} type="button" onClick={() => setNoteTab("grammar")}>
                문법·표현 정리 ({article.grammar.length})
              </button>
            </div>
          </div>
          <div className="note-table-wrap">
            <table className="note-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>일본어·후리가나</th>
                  <th>한국어</th>
                </tr>
              </thead>
              <tbody>
                {noteRows.map((row) => (
                  <tr key={row.ja}>
                    <td>{row.index}</td>
                    <td>{row.ja}</td>
                    <td>{row.ko}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="note-actions">
            <button type="button" onClick={copyNotes}>□ 복사</button>
            <button type="button" onClick={() => window.print()}>PDF</button>
            <button type="button" onClick={() => window.print()}>인쇄</button>
          </div>
        </section>
      </article>
    </>
  );
}
