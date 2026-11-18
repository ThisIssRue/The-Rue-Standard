# The Rue Standard

*Protocol. Presence. Power.*

The website for Ruvimbo Karimazondo (Rue): speaking engagements, protocol & diplomacy advisory, business etiquette training, event management and brand management.

It is a static site (`index.html`, `styles.css`, `script.js`) with no build step, so it can be hosted on GitHub Pages, Netlify or any web host.

## Before going live

Open `script.js` and edit the `CONFIG` block at the top:

| Setting | What it does |
| --- | --- |
| `CONTACT_EMAIL` | The address booking enquiries go to (currently bookings@theruestandard.com). |
| `FORM_ENDPOINT` | Optional. Paste a [Formspree](https://formspree.io) (or similar) form URL so enquiries are sent straight from the page. If you leave it empty, the visitor's email app opens with the enquiry already written. |
| `LINKEDIN_URL` | Rue's LinkedIn profile URL. |
| `PAY_CARD_URL` | A hosted card payment link (Visa/Mastercard), e.g. from Paynow. Empty = button sends visitors to the booking form. |
| `PAY_PAYPAL_URL` | A PayPal.Me or PayPal payment link. Empty = button sends visitors to the booking form. |

### Photos
- **Photos:** portraits and episode posters live in `assets/` (`rue-*.jpg`, `episode-0N.jpg`). To add a new episode, save its poster as `assets/episode-06.jpg` and copy one of the episode buttons in `index.html`.
- **In the Room gallery:** event photos live in `assets/gallery/`. To add one, save the photo there and copy one of the `<figure class="shot">` blocks in the `#media` section of `index.html`, then update its caption.

### Booking links
Any link to `#book` with `data-service="speaking|protocol|etiquette|events|brand|media"` selects that service in the booking form. `?service=brand#book` works in shared URLs too.

## Publishing on GitHub Pages
Repository **Settings → Pages → Deploy from a branch**, then choose the branch and the `/ (root)` folder.
