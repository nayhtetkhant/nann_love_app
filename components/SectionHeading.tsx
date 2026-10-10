type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: SectionHeadingProps) {
  return (
    <header className="mb-8 text-center">
      <span className="chip mb-3">{eyebrow}</span>
      <h2 className="font-display text-3xl font-bold text-plum sm:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mx-auto mt-3 max-w-md text-sm text-plum/70">{subtitle}</p>
      ) : null}
    </header>
  );
}
