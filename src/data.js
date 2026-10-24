export const PHONE = '+30 698 135 7660';
export const PHONE_HREF = 'tel:+306981357660';

export const OFFICE_EMAILS = ['garoufalis.ls@gmail.com', 'thomchri@hotmail.com'];

export const MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=Dodekanisou+21,+Thessaloniki+546+26,+Greece';
export const MAPS_EMBED = 'https://www.google.com/maps?q=Dodekanisou+21,+Thessaloniki+546+26,+Greece&output=embed';

// Order matches translations[lang].team
export const TEAM = [
  { initials: 'ΧΘ', email: 'thomchri@hotmail.com', partner: true },
  { initials: 'ΙΓ', email: 'garoufalis.ls@gmail.com', partner: true },
  { initials: 'ΑΑ', email: 'apoampr@gmail.com', partner: false },
  { initials: 'ΕΓ', email: 'efgeorgov@gmail.com', partner: false },
];

// Office hours in Europe/Athens, keyed by JS weekday (0 = Sunday).
export const HOURS = {
  1: [9, 20],
  2: [9, 20],
  3: [9, 20],
  4: [9, 20],
  5: [9, 18],
  6: null,
  0: null,
};

// Web3Forms access key (see README → Contact form). It is a public key by design:
// it only lets the form send to the inbox it was created for.
// Without it, the form falls back to opening the visitor's mail client.
export const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;
