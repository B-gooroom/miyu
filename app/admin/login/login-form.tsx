"use client";

import { useActionState } from "react";
import { formInput, formLabel, goldButton } from "../../lib/styles";
import { loginAdmin } from "../actions";

type FormState = {
  error?: string;
  success?: string;
};

const initialState: FormState = {};

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAdmin, initialState);

  return (
    <form action={action} className="grid max-w-[460px] gap-4">
      <label className={formLabel}>
        이메일
        <input className={formInput} autoComplete="email" name="email" placeholder="admin@miyu.jp" type="email" required />
      </label>
      <label className={formLabel}>
        비밀번호
        <input className={formInput} autoComplete="current-password" name="password" type="password" required />
      </label>
      {state.error ? <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-[13px] leading-[1.7] text-red-800">{state.error}</p> : null}
      <button className={goldButton} disabled={pending} type="submit">
        {pending ? "로그인 중..." : "관리자 로그인"}
      </button>
    </form>
  );
}
