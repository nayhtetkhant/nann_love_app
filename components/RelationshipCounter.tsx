"use client";

import {
  diffParts,
  formatLongDate,
  pad,
  totalDays,
  totalHours,
} from "@/lib/dates";
import { useNow } from "@/lib/useNow";

type RelationshipCounterProps = {
  /** Relationship start, as an ISO date (YYYY-MM-DD). */
  startIso: string;
};

const UNITS = [
  { key: "years", label: "Years" },
  { key: "months", label: "Months" },
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
] as const;

export default function RelationshipCounter({
  startIso,
}: RelationshipCounterProps) {
  // Parse as local midnight to keep the countdown in the visitor's timezone.
  const [year, month, day] = startIso.split("-").map(Number);
  const start = new Date(year, (month ?? 1) - 1, day ?? 1);

  // The countdown is only computed on the client, so static prerendering
  // stays deterministic. 0 means "not on the client yet".
  const nowMs = useNow();
  const now = nowMs === 0 ? null : new Date(nowMs);

  const parts = now ? diffParts(start, now) : null;
  const days = now ? totalDays(start, now) : 0;
  const hours = now ? totalHours(start, now) : 0;

  return (
    <div className="card p-7 sm:p-10">
      <p className="text-center text-sm text-plum/70">
        Together since{" "}
        <span className="font-semibold text-rose-deep">
          {formatLongDate(start)}
        </span>
      </p>

      <div
        className="mt-7 grid grid-cols-3 gap-3 sm:grid-cols-6 sm:gap-4"
        aria-busy={parts ? undefined : "true"}
      >
        {UNITS.map((unit) => (
          <div
            key={unit.key}
            className="rounded-2xl border border-rose/25 bg-gradient-to-b from-white to-blush/60 px-2 py-4 text-center shadow-sm"
          >
            <div className="font-display text-2xl font-bold text-rose-deep tabular-nums sm:text-3xl">
              {parts ? pad(parts[unit.key]) : "--"}
            </div>
            <div className="mt-1 text-[0.65rem] font-semibold tracking-widest text-plum/60 uppercase">
              {unit.label}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-7 grid gap-3 sm:grid-cols-2">
        <Stat
          label="Days together"
          value={parts ? days.toLocaleString("en-US") : "--"}
        />
        <Stat
          label="Hours together"
          value={parts ? hours.toLocaleString("en-US") : "--"}
        />
      </div>

      <p className="mt-6 text-center text-sm text-plum/75 italic">
        …and every second of it was worth it. 💗
      </p>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-plum/5 px-4 py-3 text-center">
      <div className="font-display text-xl font-bold text-plum tabular-nums">
        {value}
      </div>
      <div className="text-xs font-medium tracking-wide text-plum/60 uppercase">
        {label}
      </div>
    </div>
  );
}
