import { useEffect, useState } from 'react';
import { HOURS } from './data';

// Reveal-on-scroll: any element with [data-reveal] fades up once visible.
// Uses an attribute, not a class, so React re-renders of className don't undo it.
export const useReveal = () => {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]');
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.setAttribute('data-revealed', ''));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-revealed', '');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
};

// Current weekday and fractional hour in Athens, regardless of visitor timezone.
const athensNow = () => {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Athens',
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: 'h23',
  }).formatToParts(new Date());
  const get = (type) => parts.find((p) => p.type === type)?.value;
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
  return { day, hour: Number(get('hour')) + Number(get('minute')) / 60 };
};

export const useOfficeStatus = () => {
  const [now, setNow] = useState(athensNow);

  useEffect(() => {
    const id = setInterval(() => setNow(athensNow()), 60_000);
    return () => clearInterval(id);
  }, []);

  const today = HOURS[now.day];
  const open = !!today && now.hour >= today[0] && now.hour < today[1];

  if (open) return { open, today: now.day, closesAt: today[1] };

  // Find the next opening time.
  for (let i = 0; i < 8; i++) {
    const day = (now.day + i) % 7;
    const hours = HOURS[day];
    if (hours && (i > 0 || now.hour < hours[0])) {
      return { open, today: now.day, nextDay: i === 0 ? null : day, opensAt: hours[0] };
    }
  }
  return { open, today: now.day };
};

export const weekdayName = (locale, day, style = 'long') =>
  // 2023-01-01 was a Sunday, so day 0..6 maps directly.
  new Intl.DateTimeFormat(locale, { weekday: style, timeZone: 'UTC' }).format(
    new Date(Date.UTC(2023, 0, 1 + day))
  );

export const formatHour = (h) => `${String(h).padStart(2, '0')}:00`;
