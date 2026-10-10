"use client";

import { useMemo, useState } from "react";
import type { Wish } from "@/lib/data";

/** Wishes are read from `data/wishes.json`; ticking is kept in local state. */
export default function WishList({ wishes }: { wishes: Wish[] }) {
  const [localWishes, setLocalWishes] = useState<Wish[]>(wishes);

  const doneCount = useMemo(
    () => localWishes.filter((wish) => wish.done).length,
    [localWishes],
  );

  const toggle = (id: number) =>
    setLocalWishes((current) =>
      current.map((wish) =>
        wish.id === id ? { ...wish, done: !wish.done } : wish,
      ),
    );

  const progress =
    localWishes.length === 0
      ? 0
      : Math.round((doneCount / localWishes.length) * 100);

  return (
    <div>
      <div className="card mb-6 p-5">
        <div className="flex items-center justify-between text-sm font-semibold text-plum">
          <span>Wishes we&apos;ve done</span>
          <span className="text-rose-deep tabular-nums">
            {doneCount} / {localWishes.length}
          </span>
        </div>
        <div
          className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-plum/10"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Wishes completed"
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-rose to-rose-deep transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {localWishes.length === 0 ? (
        <p className="card p-8 text-center text-sm text-plum/70">
          No wishes yet — add some to{" "}
          <code className="rounded bg-plum/10 px-1.5 py-0.5">
            data/wishes.json
          </code>
          .
        </p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {localWishes.map((wish) => (
            <li key={wish.id}>
              <button
                type="button"
                onClick={() => toggle(wish.id)}
                aria-pressed={wish.done}
                className={`card flex w-full items-start gap-3 p-5 text-left transition hover:-translate-y-0.5 hover:shadow-lg ${
                  wish.done ? "bg-rose/10" : ""
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold ${
                    wish.done
                      ? "border-rose-deep bg-rose-deep text-white"
                      : "border-rose/60 text-transparent"
                  }`}
                >
                  ✓
                </span>
                <span>
                  <span className="chip mb-2">{wish.category}</span>
                  <span
                    className={`font-display block text-base font-semibold ${
                      wish.done
                        ? "text-plum/50 line-through"
                        : "text-plum"
                    }`}
                  >
                    {wish.title}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
