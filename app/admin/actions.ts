"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient, hasSupabaseConfig, isAllowedAdmin } from "../lib/supabase";

type ActionState = {
  error?: string;
  success?: string;
  values?: ArticleFormValues;
};

type ArticleFormValues = {
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

function valueOf(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function articleValuesOf(formData: FormData): ArticleFormValues {
  return {
    body_ja: valueOf(formData, "body_ja"),
    category: valueOf(formData, "category"),
    grammar: valueOf(formData, "grammar"),
    level: valueOf(formData, "level"),
    published_at: valueOf(formData, "published_at"),
    source_name: valueOf(formData, "source_name"),
    source_url: valueOf(formData, "source_url"),
    status: valueOf(formData, "status") || "draft",
    summary: valueOf(formData, "summary"),
    title_ja: valueOf(formData, "title_ja"),
    title_ko: valueOf(formData, "title_ko"),
    translations: valueOf(formData, "translations"),
    words: valueOf(formData, "words"),
  };
}

function parseLines(value: string, columns: number, sectionName: string, formatHint: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => {
      const parts = line.split("|").map((part) => part.trim());

      if (parts.length < columns) {
        throw new Error(`${sectionName} ${index + 1}번째 줄의 항목 수가 부족합니다. 형식: ${formatHint}`);
      }

      return parts;
    });
}

async function createUniqueSlug(supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>, publishedAt: string) {
  const baseSlug = `${publishedAt}-news`;
  const { data, error } = await supabase
    .from("articles")
    .select("slug")
    .like("slug", `${baseSlug}%`);

  if (error) {
    throw new Error(error.message);
  }

  const existingSlugs = new Set((data ?? []).map((article) => article.slug));

  if (!existingSlugs.has(baseSlug)) {
    return baseSlug;
  }

  let index = 2;
  while (existingSlugs.has(`${baseSlug}-${index}`)) {
    index += 1;
  }

  return `${baseSlug}-${index}`;
}

export async function loginAdmin(_: ActionState, formData: FormData): Promise<ActionState> {
  if (!hasSupabaseConfig()) {
    return { error: "Supabase 환경변수가 설정되지 않았습니다." };
  }

  const email = valueOf(formData, "email");
  const password = valueOf(formData, "password");

  if (!email || !password) {
    return { error: "이메일과 비밀번호를 입력해주세요." };
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error || !data.user) {
    return { error: error?.message ?? "로그인에 실패했습니다." };
  }

  if (!isAllowedAdmin(data.user.email)) {
    await supabase.auth.signOut();
    return { error: "관리자로 허용된 이메일이 아닙니다." };
  }

  redirect("/admin");
}

export async function logoutAdmin() {
  if (!hasSupabaseConfig()) {
    redirect("/admin/login");
  }

  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function updateArticleStatus(formData: FormData) {
  if (!hasSupabaseConfig()) {
    redirect("/admin");
  }

  const articleId = valueOf(formData, "article_id");
  const status = valueOf(formData, "status");

  if (!articleId || !["draft", "published"].includes(status)) {
    redirect("/admin");
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !isAllowedAdmin(user.email)) {
    redirect("/admin/login");
  }

  const { data: article, error } = await supabase
    .from("articles")
    .update({ status })
    .eq("id", articleId)
    .eq("author_id", user.id)
    .select("slug")
    .single();

  if (error || !article) {
    redirect("/admin?error=update-failed");
  }

  revalidatePath("/admin");
  revalidatePath("/news");
  revalidatePath(`/news/${article.slug}`);
  redirect(`/admin?updated=${article.slug}`);
}

export async function createArticle(_: ActionState, formData: FormData): Promise<ActionState> {
  const values = articleValuesOf(formData);

  if (!hasSupabaseConfig()) {
    return { error: "Supabase 환경변수가 설정되지 않았습니다.", values };
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !isAllowedAdmin(user.email)) {
    return { error: "관리자 로그인 후 다시 시도해주세요.", values };
  }

  if (!values.published_at || !values.title_ja || !values.title_ko || !values.body_ja) {
    return { error: "날짜, 일본어 제목, 한국어 제목, 원문은 필수입니다.", values };
  }

  let words: string[][];
  let grammar: string[][];
  let translations: string[][];

  try {
    words = parseLines(values.words, 3, "핵심 단어", "일본어|후리가나|한국어");
    grammar = parseLines(values.grammar, 4, "문법·표현", "표현|의미|일본어 예문|한국어 예문");
    translations = parseLines(values.translations, 2, "전문 해석", "일본어 문장|한국어 해석");
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "정리 항목 형식을 확인해주세요.",
      values,
    };
  }

  let slug: string;

  try {
    slug = await createUniqueSlug(supabase, values.published_at);
  } catch (error) {
    return { error: error instanceof Error ? error.message : "기사 주소 생성에 실패했습니다.", values };
  }

  const { data: article, error: articleError } = await supabase
    .from("articles")
    .insert({
      author_id: user.id,
      body_ja: values.body_ja,
      category: values.category,
      level: values.level,
      published_at: values.published_at,
      slug,
      source_name: values.source_name,
      source_url: values.source_url,
      status: values.status,
      summary: values.summary,
      title_ja: values.title_ja,
      title_ko: values.title_ko,
    })
    .select("id, slug")
    .single();

  if (articleError || !article) {
    return { error: articleError?.message ?? "기사 저장에 실패했습니다.", values };
  }

  const articleId = article.id;
  const wordRows = words.map(([ja, furigana, ko], index) => ({
    article_id: articleId,
    furigana,
    ja,
    ko,
    sort_order: index + 1,
  }));
  const grammarRows = grammar.map(([pattern, meaning, exampleJa, exampleKo], index) => ({
    article_id: articleId,
    example_ja: exampleJa,
    example_ko: exampleKo,
    meaning,
    pattern,
    sort_order: index + 1,
  }));
  const translationRows = translations.map(([ja, ko], index) => ({
    article_id: articleId,
    ja,
    ko,
    sort_order: index + 1,
  }));

  const inserts = await Promise.all([
    wordRows.length ? supabase.from("article_words").insert(wordRows) : Promise.resolve({ error: null }),
    grammarRows.length ? supabase.from("article_grammar").insert(grammarRows) : Promise.resolve({ error: null }),
    translationRows.length ? supabase.from("article_translations").insert(translationRows) : Promise.resolve({ error: null }),
  ]);
  const childError = inserts.find((result) => result.error)?.error;

  if (childError) {
    return {
      error: `기사는 저장됐지만 하위 항목 저장에 실패했습니다: ${childError.message}`,
      values,
    };
  }

  revalidatePath("/news");
  revalidatePath(`/news/${article.slug}`);
  redirect(`/admin?created=${article.slug}`);
}
