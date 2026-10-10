"use client";

import {
  ageAt,
  diffParts,
  formatLongDate,
  nextOccurrence,
  ordinal,
  pad,
  totalDays,
} from "@/lib/dates";
import { useNow } from "@/lib/useNow";

type BirthdayCardProps = {
  /** Her birth date, as an ISO date (YYYY-MM-DD). */
  birthIso: string;
  /** Name shown in the heading. */
  name: string;
};

export default function BirthdayCard({ birthIso, name }: BirthdayCardProps) {
  const [year, month, day] = birthIso.split("-").map(Number);
  const birth = new Date(year, (month ?? 1) - 1, day ?? 1);

  // The countdown is only computed on the client, so static prerendering
  // stays deterministic. 0 means "not on the client yet".
  const nowMs = useNow();
  const now = nowMs === 0 ? null : new Date(nowMs);

  // Countdown numbers, only meaningful once `now` exists.
  let upcoming: Date | null = null;
  let age = 0;
  let ageOnNextDay = 0;
  let isToday = false;
  let daysLeft = 0;
  let until = { hours: 0, minutes: 0, seconds: 0 };
  let nextOrdinal = "";

  if (now) {
    upcoming = nextOccurrence(birth.getMonth(), birth.getDate(), now);
    age = ageAt(birth, now);
    ageOnNextDay = ageAt(birth, upcoming);
    isToday =
      upcoming.getFullYear() === now.getFullYear() &&
      upcoming.getMonth() === now.getMonth() &&
      upcoming.getDate() === now.getDate();
    daysLeft = totalDays(now, upcoming);
    const parts = diffParts(now, upcoming);
    until = { hours: parts.hours, minutes: parts.minutes, seconds: parts.seconds };
    nextOrdinal = ordinal(ageOnNextDay);
  }

  return (
    <div className="card p-7 text-center sm:p-10">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-rose to-rose-deep text-3xl shadow-lg">
        🎂
      </div>

      <h3 className="font-display text-2xl font-bold text-plum sm:text-3xl">
        Happy Birthday, {name}!
      </h3>
      <p className="mt-2 text-sm text-plum/70">Born on {formatLongDate(birth)}</p>

      <div className="mt-6 rounded-2xl border border-rose/25 bg-white/80 px-5 py-5">
        {!upcoming ? (
          <div aria-busy="true">
            <p className="text-sm font-medium tracking-wide text-plum/60 uppercase">
              Counting down to her birthday
            </p>
            <div className="mt-4 grid grid-cols-4 gap-2">
              {["Days", "Hours", "Minutes", "Seconds"].map((label) => (
                <div
                  key={label}
                  className="h-[4.4rem] animate-pulse rounded-xl bg-blush/70"
                >
                  <span className="sr-only">{label}</span>
                </div>
              ))}
            </div>
          </div>
        ) : isToday ? (
          <p className="font-display text-xl font-bold text-rose-deep">
            It&apos;s TODAY! Happy {nextOrdinal} birthday, my love! 🎉
          </p>
        ) : (
          <>
            <p className="text-sm font-medium tracking-wide text-plum/60 uppercase">
              Until her {nextOrdinal} birthday
            </p>
            <div className="mt-4 grid grid-cols-4 gap-2">
              <MiniBox value={pad(daysLeft)} label="Days" highlight />
              <MiniBox value={pad(until.hours)} label="Hours" />
              <MiniBox value={pad(until.minutes)} label="Minutes" />
              <MiniBox value={pad(until.seconds)} label="Seconds" />
            </div>
            <p className="mt-4 text-sm text-plum/75">
              On{" "}
              <span className="font-semibold text-rose-deep">
                {formatLongDate(upcoming)}
              </span>{" "}
              she turns{" "}
              <span className="font-semibold text-plum">{ageOnNextDay}</span>. 💗
            </p>
          </>
        )}
      </div>

      <p className="mt-5 text-sm text-plum/75 italic">
        {now
          ? `She is ${age} years young today — and prettier every single year.`
          : "She gets prettier every single year."}
      </p>
    </div>
  );
}

function MiniBox({
  value,
  label,
  highlight = false,
}: {
  value: string;
  label: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl px-1 py-3 ${
        highlight
          ? "bg-gradient-to-b from-rose to-rose-deep text-white"
          : "bg-blush/70 text-rose-deep"
      }`}
    >
      <div className="font-display text-xl font-bold tabular-nums">{value}</div>
      <div
        className={`mt-0.5 text-[0.6rem] font-semibold tracking-widest uppercase ${
          highlight ? "text-white/80" : "text-plum/60"
        }`}
      >
        {label}
      </div>
    </div>
  );
}
