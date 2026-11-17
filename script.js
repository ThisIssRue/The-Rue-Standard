/* ==========================================================
   The Rue Standard — site configuration
   ----------------------------------------------------------
   1. CONTACT_EMAIL: where enquiries should go.
   2. FORM_ENDPOINT (optional): a form service URL, e.g. a free
      Formspree form ("https://formspree.io/f/xxxxxxx"). When set,
      enquiries are submitted directly from the page. When empty,
      the visitor's email app opens with the enquiry pre-written.
   3. LINKEDIN_URL: Rue's LinkedIn profile.
   ========================================================== */
const CONFIG = {
  CONTACT_EMAIL: "bookings@theruestandard.com", // TODO: replace with your real address
  FORM_ENDPOINT: "",
  LINKEDIN_URL: "https://www.linkedin.com/",
};

(function () {
  document.documentElement.classList.remove("no-js");
  document.getElementById("year").textContent = new Date().getFullYear();

  // LinkedIn links
  document.querySelectorAll('[data-link="linkedin"]').forEach((a) => (a.href = CONFIG.LINKEDIN_URL));

  // Nav: scrolled state + mobile menu
  const nav = document.querySelector(".nav");
  const toggle = document.querySelector(".nav__toggle");
  const menu = document.getElementById("menu");
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const setMenu = (open) => {
    menu.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.style.overflow = open ? "hidden" : "";
  };
  toggle.addEventListener("click", () => setMenu(!menu.classList.contains("is-open")));
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => e.key === "Escape" && setMenu(false));

  // Reveal on scroll
  const items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    items.forEach((el) => io.observe(el));
  } else {
    items.forEach((el) => el.classList.add("is-in"));
  }

  // Booking form
  const form = document.getElementById("booking-form");
  const status = form.querySelector(".form__status");
  const radios = form.querySelectorAll('input[name="service"]');
  const speakingExtra = document.getElementById("speaking-extra");
  const pick = form.querySelector(".services-pick");

  const selectService = (key) => {
    const r = form.querySelector(`input[name="service"][data-key="${key}"]`);
    if (r) { r.checked = true; updateExtra(); pick.classList.remove("is-invalid"); }
  };
  const updateExtra = () => {
    const sel = form.querySelector('input[name="service"]:checked');
    speakingExtra.hidden = !(sel && sel.dataset.key === "speaking");
  };
  radios.forEach((r) => r.addEventListener("change", () => { updateExtra(); pick.classList.remove("is-invalid"); }));

  // Any "book" link with data-service pre-selects that service
  document.querySelectorAll("[data-service]").forEach((a) =>
    a.addEventListener("click", () => selectService(a.dataset.service))
  );
  // Support links like #book?service=brand or ?service=brand
  const qs = new URLSearchParams(location.search || location.hash.split("?")[1] || "");
  if (qs.get("service")) selectService(qs.get("service"));

  // Don't allow past dates
  const dateInput = form.querySelector('input[name="date"]');
  dateInput.min = new Date().toISOString().split("T")[0];

  const setStatus = (msg, type) => { status.textContent = msg; status.className = "form__status " + (type || ""); };

  const validate = () => {
    let ok = true;
    form.querySelectorAll(".is-invalid").forEach((el) => el.classList.remove("is-invalid"));
    if (!form.querySelector('input[name="service"]:checked')) { pick.classList.add("is-invalid"); ok = false; }
    ["name", "email", "message"].forEach((n) => {
      const el = form.elements[n];
      if (!el.value.trim() || (n === "email" && !el.checkValidity())) { el.classList.add("is-invalid"); ok = false; }
    });
    return ok;
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (form.elements._gotcha.value) return; // bot trap
    if (!validate()) {
      setStatus("Please choose a service and complete the required fields.", "err");
      const first = form.querySelector(".is-invalid input, input.is-invalid, textarea.is-invalid");
      if (first) first.focus();
      return;
    }

    const data = Object.fromEntries(new FormData(form).entries());
    delete data._gotcha;

    if (CONFIG.FORM_ENDPOINT) {
      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true; btn.textContent = "Sending…";
      try {
        const res = await fetch(CONFIG.FORM_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ ...data, _subject: `New enquiry: ${data.service} — ${data.name}` }),
        });
        if (!res.ok) throw new Error(res.status);
        form.reset(); updateExtra();
        setStatus("Thank you. Your enquiry has been received — Rue’s team will be in touch within two working days.", "ok");
      } catch (err) {
        setStatus(`Sorry, something went wrong. Please email ${CONFIG.CONTACT_EMAIL} directly.`, "err");
      } finally {
        btn.disabled = false; btn.textContent = "Send Enquiry";
      }
      return;
    }

    // Fallback: open the visitor's email app with the enquiry pre-filled
    const lines = [
      `Type of enquiry: ${data.service}`,
      `Name: ${data.name}`,
      data.organisation && `Organisation: ${data.organisation}`,
      `Email: ${data.email}`,
      data.phone && `Phone: ${data.phone}`,
      data.format && `Preferred format: ${data.format}`,
      data.audience && `Audience size: ${data.audience}`,
      data.date && `Event date: ${data.date}`,
      data.location && `Location: ${data.location}`,
    ].filter(Boolean).concat(["", data.message]);
    const subject = `Enquiry: ${data.service} — ${data.name}`;
    location.href = `mailto:${CONFIG.CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
    setStatus("Your email app should now open with your enquiry ready to send.", "ok");
  });
})();
