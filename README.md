# The Rue Standard

*Protocol. Presence. Power.*

The website for Ruvimbo Karimazondo (Rue): speaking engagements, business etiquette training, executive presence coaching, events (through Bénie) and brand management.

It is a static site (`index.html`, `styles.css`, `script.js`) with no build step, so it can be hosted on GitHub Pages, Netlify or any web host.

## Before going live

Open `script.js` and edit the `CONFIG` block at the top:

| Setting | What it does |
| --- | --- |
| `CONTACT_EMAIL` | The address booking enquiries go to (currently bookings@theruestandard.com). |
| `FORM_ENDPOINT` | Optional. Paste a [Formspree](https://formspree.io) (or similar) form URL so enquiries are sent straight from the page. If you leave it empty, the visitor's email app opens with the enquiry already written. |
| `WHATSAPP_NUMBER` | Digits only with country code (e.g. `263771234567`). Shows the floating Concierge WhatsApp button. Empty = hidden. |
| `LINKEDIN_URL` | Rue's LinkedIn profile URL. |
| `PAY_CARD_URL` | A hosted card payment link (Visa/Mastercard), e.g. from Paynow. Empty = button sends visitors to the booking form. |
| `PAY_PAYPAL_URL` | A PayPal.Me or PayPal payment link. Empty = button sends visitors to the booking form. |

### Photos
- **Photos:** portraits and episode posters live in `assets/` (`rue-*.jpg`, `episode-0N.jpg`). To add a new episode, save its poster as `assets/episode-06.jpg` and copy one of the episode buttons in `index.html`.
- **Media & Recognition gallery:** event photos live in `assets/gallery/`. To add one, save the photo there and copy one of the `<figure class="shot">` blocks in the `#media` section of `index.html`, then update its caption.

### Booking links
Any link to `#book` with `data-service="speaking|coaching|etiquette|events|brand|media"` selects that service in the booking form. `?service=brand#book` works in shared URLs too.

## Publishing on GitHub Pages
Repository **Settings → Pages → Deploy from a branch**, then choose the branch and the `/ (root)` folder.

## Media Kit
`media-kit.html` is the source of the two-page A4 Media Kit. After editing it, regenerate `assets/the-rue-standard-media-kit.pdf` by printing the page to PDF (A4, background graphics on) or with Playwright's `page.pdf()`.

## Link previews and search
`index.html` has Open Graph, Twitter and schema.org tags using `https://thisissrue.github.io/The-Rue-Standard/`. If the site moves to its own domain (e.g. theruestandard.com), replace that address everywhere in the `<head>`. The share image is `assets/share-card.jpg` (1200×630).

## Independence from employment
The site is deliberately kept separate from Rue's employment: no employer names, job title, work events or work photos, and no government, diplomatic or official protocol services. Keep new content to that rule.
