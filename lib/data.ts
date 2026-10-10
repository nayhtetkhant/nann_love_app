import fs from "node:fs";
import path from "node:path";

export type Note = {
  id: number;
  date: string;
  title: string;
  body: string;
};

export type Wish = {
  id: number;
  title: string;
  category: string;
  done: boolean;
};

/** The app's own milestones. Edit these three lines to change everything. */
export const ANNIVERSARY = new Date(2025, 1, 3); // 3 Feb 2025 (month is 0-indexed)
export const BIRTHDAY = new Date(2009, 5, 20); // 20 June 2009

function readJson<T>(fileName: string): T[] {
  const filePath = path.join(process.cwd(), "data", fileName);

  try {
    const raw = fs.readFileSync(filePath, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch (error) {
    // A missing or malformed data file should degrade to an empty list
    // rather than take down the whole page (and the build).
    console.error(`Could not read data/${fileName}:`, error);
    return [];
  }
}

/** Newest notes first. */
export function getNotes(): Note[] {
  return readJson<Note>("notes.json").sort((a, b) =>
    a.date < b.date ? 1 : a.date > b.date ? -1 : 0,
  );
}

export function getWishes(): Wish[] {
  return readJson<Wish>("wishes.json");
}

export type Photo = {
  src: string;
  caption: string;
};

/** Her photos, in the order they appear in the gallery. */
export const PHOTOS: Photo[] = [
  { src: "/photos/nann4.jpg", caption: "My favourite smile 💗" },
  { src: "/photos/nann3.jpg", caption: "Us, being silly" },
  { src: "/photos/nann1.jpg", caption: "That day at the café" },
  { src: "/photos/nann_bth2.jpg", caption: "Birthday girl 🎂" },
  { src: "/photos/nann_bth.jpg", caption: "Cake, candles, and you" },
];
