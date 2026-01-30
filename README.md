# ΘΩΜΟΣ ΧΡΗΣΤΟΣ – ΓΑΡΟΥΦΑΛΗΣ ΙΩΑΝΝΗΣ ΚΑΙ ΣΥΝΕΡΓΑΤΕΣ

Bilingual (Greek/English) professional law firm website built with React and Vite.

## Features

- **Bilingual Support**: Instant language toggle between Greek (default) and English
- **Single Page Application**: Smooth scrolling navigation
- **Responsive Design**: Mobile, tablet, and desktop optimized
- **Contact Form**: Client-side validation with Netlify Forms/Formspree compatibility
- **SEO Optimized**: Proper meta tags, Open Graph, and semantic HTML
- **Professional Design**: Conservative legal aesthetic with high readability

## Project Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The development server will start at `http://localhost:5173`

## Folder / File Structure

```
thelawfirmproject/
├── index.html                 # Main HTML with SEO meta tags
├── package.json              # Project dependencies
├── vite.config.js           # Vite configuration
├── README.md                # This file
├── src/
│   ├── main.jsx            # React entry point
│   ├── App.jsx             # Main application component
│   ├── LanguageContext.jsx # Language state management
│   ├── translations.js      # Bilingual translation dictionary
│   ├── index.css           # Global styles
│   ├── components/
│   │   ├── Navigation.jsx  # Header navigation with language toggle
│   │   ├── Home.jsx        # Home section
│   │   ├── Services.jsx    # Services section
│   │   ├── Team.jsx        # Team section
│   │   └── Contact.jsx     # Contact section with form
│   └── Footer.jsx          # Footer component
```

## Form Handling Configuration

### Web3Forms (Current Configuration)

The contact form is configured to use Web3Forms for email delivery. To activate:

1. Sign up at [web3forms.com](https://www.web3forms.com)
2. Get your Access Key from the dashboard
3. Replace `YOUR_ACCESS_KEY` in `src/components/Contact.jsx` with your actual access key
4. Email will be sent to: misterlemo@gmail.com

The form is already configured with:
- API endpoint: `https://api.web3forms.com/submit`
- Email recipient: misterlemo@gmail.com
- Subject: "New Contact Form Submission"
- Reply-to: sender's email address

### Alternative Options

**Option 1: Netlify Forms**
- Add `data-netlify="true"` attribute to form
- Deploy to Netlify - forms work automatically
- Configure email notifications in Netlify dashboard

**Option 2: Formspree**
1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form to get your endpoint URL
3. Update form action to your Formspree endpoint

## Content Update Instructions

### Updating Firm Information

1. **Firm Name**: Edit `src/translations.js` - search for `firmName` in both `el` and `en` objects
2. **Tagline**: Edit `tagline` in translations
3. **Address**: Edit `address` in translations
4. **Contact Info**: Edit phone, emails, office hours in translations

### Updating Team Members

Edit `src/components/Team.jsx`:

```jsx
const teamMembers = [
  {
    key: 'member1',  // Must match translation keys
    email: 'email@example.com'
  },
  // Add more members...
];
```

Then add corresponding translations in `src/translations.js`:

```js
member1Name: 'NAME',
member1Role: 'Role',
member1Bio: 'Bio text...',
```

### Updating Services

Edit `src/components/Services.jsx`:

```jsx
const services = [
  {
    key: 'service1',  // Must match translation keys
    icon: '🏠'
  },
  // Add more services...
];
```

Then add translations in `src/translations.js`:

```js
service1Title: 'Service Title',
service1Desc: 'Service description...',
```

### Replacing Placeholder Photos

Replace the placeholder div in `src/components/Team.jsx`:

```jsx
<div className="team-photo-placeholder">
  <span>{t[`${member.key}Name`].charAt(0)}</span>
</div>
```

With:

```jsx
<img 
  src="/images/team-member-name.jpg" 
  alt={t.altTeamPhoto}
  className="team-photo"
/>
```

## Placeholders Used

The following placeholders require updating with verified information:

1. **[To Be Updated: Official English firm name]** - Appears in:
   - English firm name in translations
   - Meta title
   - Footer copyright

2. **[To Be Updated: Professional role / specialization]** - Appears for each team member:
   - Christos Thomos
   - Ioannis Garoufalis
   - Apostolos Amprasis
   - Eftymia Georgovitsa

3. **[To Be Updated: Professional biography in Greek]** - Greek bio for each team member

4. **[To Be Updated: Professional biography in English]** - English bio for each team member

## SEO Configuration

### Meta Tags (index.html)

- Update `<meta name="description">` with your final description
- Update Open Graph tags if needed
- The `<title>` tag is set to Greek by default

### Language Detection

The application defaults to Greek (`el`) as the primary language. The language toggle:
- Updates all visible text instantly
- Changes document language attribute
- Updates meta descriptions for SEO

## Deployment

### Netlify (Recommended)

1. Connect your Git repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Forms are automatically handled

### Vercel

1. Connect your Git repository to Vercel
2. Framework preset: Vite
3. Forms require Formspree integration

### Static Hosting

```bash
npm run build
# Upload contents of /dist folder to your hosting provider
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility

- Semantic HTML5 elements
- ARIA labels for interactive elements
- Proper heading hierarchy (single H1)
- Keyboard navigation support
- High contrast colors
- Responsive text sizing

## Customization

### Colors

Edit CSS variables in `src/index.css`:

```css
:root {
  --color-primary: #1a3a52;
  --color-secondary: #c9a227;
  --color-text: #333333;
  /* ... */
}
```

### Fonts

The site uses Google Fonts:
- Playfair Display (headings)
- Open Sans (body)

To change fonts, update the Google Fonts link in `index.html` and CSS variables.

## License

© 2019-2025 ΘΩΜΟΣ ΧΡΗΣΤΟΣ – ΓΑΡΟΥΦΑΛΗΣ ΙΩΑΝΝΗΣ ΚΑΙ ΣΥΝΕΡΓΑΤΕΣ. All rights reserved.

## Support

For technical support or questions, contact the development team.
