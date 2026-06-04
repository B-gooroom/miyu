"use client";

import { useActionState } from "react";
import { formInput, formLabel, goldButton } from "../../../lib/styles";
import { createArticle } from "../../actions";

type FormState = {
  error?: string;
  success?: string;
  values?: {
    body_ja: string;
    category: string;
    grammar: string;
    level: string;
    published_at: string;
    source_name: string;
    source_url: string;
    status: string;
    summary: string;
    title_ja: string;
    title_ko: string;
    translations: string;
    words: string;
  };
};

const initialState: FormState = {};
const emptyValues = {
  body_ja: "",
  category: "",
  grammar: "",
  level: "",
  published_at: "",
  source_name: "NHK NEWS WEB",
  source_url: "",
  status: "draft",
  summary: "",
  title_ja: "",
  title_ko: "",
  translations: "",
  words: "",
};

export function ArticleForm() {
  const [state, action, pending] = useActionState(createArticle, initialState);
  const values = state.values ?? emptyValues;

  return (
    <form action={action} className="grid gap-4">
      <div className="grid gap-3 md:grid-cols-2">
        <label className={formLabel}>
          공개일
          <input
            className={formInput}
            defaultValue={values.published_at}
            name="published_at"
            type="date"
            required
          />
        </label>
        <label className={formLabel}>
          상태
          <select
            className={formInput}
            defaultValue={values.status ?? "draft"}
            name="status"
          >
            <option value="draft">미등록</option>
            <option value="published">등록</option>
          </select>
        </label>
        <label className={formLabel}>
          카테고리
          <input
            className={formInput}
            defaultValue={values.category}
            name="category"
            placeholder="사회"
          />
        </label>
        <label className={formLabel}>
          레벨
          <input
            className={formInput}
            defaultValue={values.level}
            name="level"
            placeholder="N3-N1"
          />
        </label>
        <label className={formLabel}>
          출처명
          <input
            className={formInput}
            defaultValue={values.source_name ?? "NHK NEWS WEB"}
            name="source_name"
          />
        </label>
        <label className={formLabel}>
          출처 URL
          <input
            className={formInput}
            defaultValue={values.source_url}
            name="source_url"
            placeholder="https://www3.nhk.or.jp/news/..."
          />
        </label>
      </div>

      <label className={formLabel}>
        일본어 제목
        <input
          className={formInput}
          defaultValue={values.title_ja}
          name="title_ja"
          required
        />
      </label>
      <label className={formLabel}>
        한국어 제목
        <input
          className={formInput}
          defaultValue={values.title_ko}
          name="title_ko"
          required
        />
      </label>
      <label className={formLabel}>
        요약
        <textarea
          className={`${formInput} resize-y leading-[1.7]`}
          defaultValue={values.summary}
          name="summary"
          rows={3}
        />
      </label>
      <label className={formLabel}>
        일본어 원문
        <textarea
          className={`${formInput} resize-y leading-[1.7]`}
          defaultValue={values.body_ja}
          name="body_ja"
          rows={8}
          required
        />
      </label>

      <div className="border-l-[3px] border-[var(--gold)] bg-[#fff8e8] px-3.5 py-3">
        <strong className="text-[13px] text-[var(--gold)]">입력 형식</strong>
        <p className="mt-1.5 text-[13px] leading-[1.7]">
          아래 정리 항목은 한 줄에 하나씩 쓰고, 항목은 `|`로 구분합니다.
        </p>
      </div>

      <label className={formLabel}>
        핵심 단어
        <textarea
          className={`${formInput} resize-y leading-[1.7]`}
          defaultValue={values.words}
          name="words"
          placeholder={"地方|ちほう|지방, 지역\n観光|かんこう|관광"}
          rows={6}
        />
      </label>
      <label className={formLabel}>
        문법·표현
        <textarea
          className={`${formInput} resize-y leading-[1.7]`}
          defaultValue={values.grammar}
          name="grammar"
          placeholder={
            "〜として|자격/역할을 나타냄|学びの旅として人気です。|배움의 여행으로 인기가 있습니다."
          }
          rows={6}
        />
      </label>
      <label className={formLabel}>
        전문 해석
        <textarea
          className={`${formInput} resize-y leading-[1.7]`}
          defaultValue={values.translations}
          name="translations"
          placeholder={
            "日本各地で動きが広がっています。|일본 각지에서 움직임이 확산되고 있습니다."
          }
          rows={6}
        />
      </label>

      {state.error ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-[13px] leading-[1.7] text-red-800">
          {state.error}
        </p>
      ) : null}
      <button className={goldButton} disabled={pending} type="submit">
        {pending ? "저장 중..." : "기사 저장"}
      </button>
    </form>
  );
}
