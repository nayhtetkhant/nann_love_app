import { formatShortDate } from "@/lib/dates";
import type { Note } from "@/lib/data";

/** Notes are read from `data/notes.json` on the server, then rendered here. */
export default function NoteList({ notes }: { notes: Note[] }) {
  if (notes.length === 0) {
    return (
      <p className="card p-8 text-center text-sm text-plum/70">
        No notes yet — add some to{" "}
        <code className="rounded bg-plum/10 px-1.5 py-0.5">data/notes.json</code>.
      </p>
    );
  }

  return (
    <ol className="relative space-y-5 border-l-2 border-dashed border-rose/40 pl-6">
      {notes.map((note) => {
        const [y, m, d] = note.date.split("-").map(Number);
        const date = new Date(y, (m ?? 1) - 1, d ?? 1);

        return (
          <li key={note.id} className="relative">
            <span
              aria-hidden="true"
              className="absolute top-4 -left-[1.97rem] flex h-4 w-4 items-center justify-center rounded-full bg-rose-deep ring-4 ring-blush"
            />
            <article className="card p-5 sm:p-6">
              <p className="text-xs font-semibold tracking-widest text-rose-deep uppercase">
                {formatShortDate(date)}
              </p>
              <h3 className="font-display mt-1.5 text-lg font-bold text-plum">
                {note.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-plum/80">
                {note.body}
              </p>
            </article>
          </li>
        );
      })}
    </ol>
  );
}
