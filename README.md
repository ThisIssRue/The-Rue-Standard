# The Rue Standard

*Protocol. Presence. Power.*

The website for Ruvimbo Karimazondo (Rue): speaking engagements, protocol & diplomacy advisory, business etiquette training, event management and brand management.

It is a static site (`index.html`, `styles.css`, `script.js`) with no build step, so it can be hosted on GitHub Pages, Netlify or any web host.

## Before going live

Open `script.js` and edit the `CONFIG` block at the top:

| Setting | What it does |
| --- | --- |
| `CONTACT_EMAIL` | The address booking enquiries go to. **Replace the placeholder.** |
| `FORM_ENDPOINT` | Optional. Paste a [Formspree](https://formspree.io) (or similar) form URL so enquiries are sent straight from the page. If you leave it empty, the visitor's email app opens with the enquiry already written. |
| `LINKEDIN_URL` | Rue's LinkedIn profile URL. |

### Photos
- **Portrait:** save a photo as `assets/rue.jpg` (portrait orientation, about 4:5). Until then, a gold "Rue" monogram is shown.
- **In the Room gallery:** replace the "Photo coming soon" placeholders in the `#media` section of `index.html` with `<img>` tags, event names, dates and descriptions.

### Booking links
Any link to `#book` with `data-service="speaking|protocol|etiquette|events|brand|media"` selects that service in the booking form. `?service=brand#book` works in shared URLs too.

## Publishing on GitHub Pages
Repository **Settings → Pages → Deploy from a branch**, then choose the branch and the `/ (root)` folder.
