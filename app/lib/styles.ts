export function cx(...classes: Array<false | null | string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export const pageShell = "mx-auto w-[min(1120px,calc(100%-40px))]";
export const eyebrow =
  "text-[11px] font-extrabold tracking-normal text-[var(--gold)]";
export const sectionHeading =
  "mb-4 text-[15px] font-bold tracking-normal text-[var(--navy)]";
export const outlineButton =
  "min-h-8 cursor-pointer rounded-lg border border-[var(--line)] bg-white px-3 text-xs font-bold text-[var(--navy)]";
export const goldButton =
  "inline-flex min-h-10 cursor-pointer items-center justify-center rounded-lg  bg-[var(--gold)] px-4 text-xs font-extrabold text-white disabled:cursor-wait disabled:opacity-60";
export const formInput =
  "w-full rounded-lg border border-[var(--line)] bg-white px-3 py-2.5 text-sm font-medium text-[var(--text)] outline-none focus:border-[rgba(184,134,11,0.7)] focus:shadow-[0_0_0_3px_rgba(184,134,11,0.12)]";
export const formLabel = "grid gap-2 text-xs font-extrabold text-[var(--navy)]";
