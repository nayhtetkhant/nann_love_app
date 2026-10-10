import {
  ANNIVERSARY,
  BIRTHDAY,
  PHOTOS,
  getNotes,
  getWishes,
} from "@/lib/data";
import BirthdayCard from "@/components/BirthdayCard";
import FloatingHearts from "@/components/FloatingHearts";
import NoteList from "@/components/NoteList";
import PhotoGallery from "@/components/PhotoGallery";
import RelationshipCounter from "@/components/RelationshipCounter";
import SectionHeading from "@/components/SectionHeading";
import SectionNav from "@/components/SectionNav";
import WishList from "@/components/WishList";

const toIso = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate(),
  ).padStart(2, "0")}`;

export default function Home() {
  const notes = getNotes();
  const wishes = getWishes();

  return (
    <div className="relative min-h-screen">
      <FloatingHearts />

      <div className="relative z-10">
        <SectionNav />

        <main className="mx-auto max-w-4xl px-4 pb-20 sm:px-6">
          {/* Hero */}
          <section className="pt-14 pb-16 text-center sm:pt-20">
            <p className="chip mb-5">Our little corner of the internet</p>
            <h1 className="font-display text-4xl leading-tight font-bold text-plum sm:text-6xl">
              For the girl who
              <br />
              <span className="bg-gradient-to-r from-rose-deep via-rose to-fuchsia-500 bg-clip-text text-transparent">
                has my whole heart
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-lg text-base text-plum/75 sm:text-lg">
              Our anniversary, your birthday, everything I want to remember, and
              every wish I have for us. 💗
            </p>
          </section>

          {/* Anniversary */}
          <section id="anniversary" className="scroll-mt-20 pb-20">
            <SectionHeading
              eyebrow="Anniversary"
              title="The day we became us"
              subtitle="3 February 2025 — the day everything changed, and every second counted since."
            />
            <RelationshipCounter startIso={toIso(ANNIVERSARY)} />
          </section>

          {/* Birthday */}
          <section id="birthday" className="scroll-mt-20 pb-20">
            <SectionHeading
              eyebrow="Birthday"
              title="The day the world got its best person"
              subtitle="20 June — always the sweetest day of my year."
            />
            <BirthdayCard birthIso={toIso(BIRTHDAY)} name="Nann" />
          </section>

          {/* Notes */}
          <section id="notes" className="scroll-mt-20 pb-20">
            <SectionHeading
              eyebrow="Our notes"
              title="Things I never want to forget"
              subtitle="Read straight from data/notes.json — add a memory any time."
            />
            <NoteList notes={notes} />
          </section>

          {/* Wishes */}
          <section id="wishes" className="scroll-mt-20 pb-20">
            <SectionHeading
              eyebrow="Wishes"
              title="Everything I wish for with you"
              subtitle="From data/wishes.json — tap one to mark it as done."
            />
            <WishList wishes={wishes} />
          </section>

          {/* Photos */}
          <section id="photos" className="scroll-mt-20 pb-20">
            <SectionHeading
              eyebrow="Photos"
              title="My favourite view"
              subtitle="Tap a photo to see it bigger."
            />
            <PhotoGallery photos={PHOTOS} />
          </section>

          <footer className="pt-4 text-center text-sm text-plum/60">
            <p className="font-display text-lg text-plum">
              I love you, always and all ways. 💞
            </p>
            <p className="mt-2 text-xs">
              Made with ♥ for Nann · 2026
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
