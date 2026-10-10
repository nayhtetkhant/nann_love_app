/**
 * Pure date helpers for the "us" app.
 * All dates are handled in the visitor's local timezone.
 */

export type DateParts = {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

/** Calendar-accurate difference between two dates (borrows like a clock does). */
export function diffParts(start: Date, end: Date): DateParts {
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();
  let hours = end.getHours() - start.getHours();
  let minutes = end.getMinutes() - start.getMinutes();
  let seconds = end.getSeconds() - start.getSeconds();

  if (seconds < 0) {
    seconds += 60;
    minutes -= 1;
  }
  if (minutes < 0) {
    minutes += 60;
    hours -= 1;
  }
  if (hours < 0) {
    hours += 24;
    days -= 1;
  }
  if (days < 0) {
    months -= 1;
    days += new Date(end.getFullYear(), end.getMonth(), 0).getDate();
  }
  if (months < 0) {
    months += 12;
    years -= 1;
  }

  return { years, months, days, hours, minutes, seconds };
}

/** Whole calendar days between two dates, ignoring the time of day. */
export function totalDays(start: Date, end: Date): number {
  const a = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
  const b = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());
  return Math.max(0, Math.round((b - a) / 86_400_000));
}

/** Whole hours between two instants. */
export function totalHours(start: Date, end: Date): number {
  return Math.max(0, Math.floor((end.getTime() - start.getTime()) / 3_600_000));
}

/**
 * The next occurrence of a month/day (0-indexed month) on or after `from`.
 * Feb 29 falls back to Feb 28 in non-leap years.
 */
export function nextOccurrence(month: number, day: number, from: Date): Date {
  const isFeb29 = month === 1 && day === 29;

  const candidate = (year: number) => {
    const safeDay = isFeb29 && !isLeapYear(year) ? 28 : day;
    return new Date(year, month, safeDay, 0, 0, 0, 0);
  };

  const todayMidnight = new Date(
    from.getFullYear(),
    from.getMonth(),
    from.getDate(),
  );
  const thisYear = candidate(from.getFullYear());
  return thisYear.getTime() >= todayMidnight.getTime()
    ? thisYear
    : candidate(from.getFullYear() + 1);
}

export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/** Age in completed years at a given date. */
export function ageAt(birth: Date, at: Date): number {
  let age = at.getFullYear() - birth.getFullYear();
  const monthDiff = at.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && at.getDate() < birth.getDate())) {
    age -= 1;
  }
  return Math.max(0, age);
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function formatLongDate(date: Date): string {
  return `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

export function formatShortDate(date: Date): string {
  return `${MONTHS[date.getMonth()].slice(0, 3)} ${date.getDate()}, ${date.getFullYear()}`;
}

/** Zero-padded, e.g. "07". */
export function pad(n: number): string {
  return String(Math.max(0, Math.floor(n))).padStart(2, "0");
}

/** "1st", "2nd", "3rd", "4th" ... */
export function ordinal(n: number): string {
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 13) return `${n}th`;
  switch (n % 10) {
    case 1:
      return `${n}st`;
    case 2:
      return `${n}nd`;
    case 3:
      return `${n}rd`;
    default:
      return `${n}th`;
  }
}
