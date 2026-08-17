/* ============================================================
   Cafe Mysteria — Interactions
   ============================================================ */

(function () {
  "use strict";

  /* ---------- Navbar shrink on scroll ---------- */
  const navbar = document.getElementById("navbar");
  const onScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu toggle ---------- */
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  links.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );

  /* ---------- Active link highlight on scroll ---------- */
  const sections = document.querySelectorAll("section[id]");
  const navAnchors = links.querySelectorAll("a");
  const setActive = () => {
    let current = "";
    const pos = window.scrollY + 120;
    sections.forEach((sec) => {
      if (pos >= sec.offsetTop) current = sec.id;
    });
    navAnchors.forEach((a) => {
      a.classList.toggle("active", a.getAttribute("href") === "#" + current);
    });
  };
  window.addEventListener("scroll", setActive, { passive: true });
  setActive();

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = (el.dataset.delay || i % 4) * 80;
          setTimeout(() => el.classList.add("visible"), delay);
          io.unobserve(el);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
  );
  revealEls.forEach((el) => io.observe(el));

  /* ---------- Hero mouse spotlight ---------- */
  const hero = document.getElementById("hero");
  const spotlight = document.getElementById("spotlight");
  if (hero && spotlight) {
    hero.addEventListener("mousemove", (e) => {
      const rect = hero.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      spotlight.style.setProperty("--mx", x + "%");
      spotlight.style.setProperty("--my", y + "%");
    });
  }

  /* ---------- Animated number counters ---------- */
  const counters = document.querySelectorAll(".spec-num[data-count]");
  const countIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || "";
        const dur = 1400;
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(eased * target) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        countIO.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );
  counters.forEach((c) => countIO.observe(c));

  /* ---------- Booking form ---------- */
  const form = document.getElementById("bookingForm");
  const success = document.getElementById("formSuccess");
  const today = new Date().toISOString().split("T")[0];
  const dateField = document.getElementById("date");
  if (dateField) dateField.min = today;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = (data.get("name") || "").toString().trim();
    const phone = (data.get("phone") || "").toString().trim();
    const date = (data.get("date") || "").toString().trim();
    const guests = (data.get("guests") || "").toString().trim();

    if (!name || !phone || !date || !guests) {
      form.querySelectorAll(":invalid").forEach((f) => {
        f.style.borderColor = "#d67270";
        setTimeout(() => (f.style.borderColor = ""), 1800);
      });
      return;
    }

    const msg =
      `Hi Cafe Mysteria, I'd like to book a table.%0A` +
      `Name: ${encodeURIComponent(name)}%0A` +
      `Phone: ${encodeURIComponent(phone)}%0A` +
      `Date: ${encodeURIComponent(date)}%0A` +
      `Guests: ${encodeURIComponent(guests)}%0A` +
      (data.get("note")
        ? `Note: ${encodeURIComponent(data.get("note"))}`
        : "");

    success.classList.add("show");
    form.reset();

    setTimeout(() => {
      window.open(
        "https://wa.me/919000000000?text=" + msg,
        "_blank",
        "noopener"
      );
    }, 700);

    setTimeout(() => success.classList.remove("show"), 6000);
  });

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Smooth anchor fallback (older browsers) ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (id.length <= 1) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
})();
 
const chatbot = document.getElementById("chatbot");
const chatbotToggle = document.getElementById("chatbotToggle");
const closeChat = document.getElementById("closeChat");
const chatbotBody = document.getElementById("chatbotBody");

chatbotToggle.addEventListener("click", () => {
  chatbot.style.display = "block";
});

closeChat.addEventListener("click", () => {
  chatbot.style.display = "none";
});

function botReply(type) {
  let response = "";

  switch(type) {
    case "timings":
      response = "Cafe Mysteria is open daily from 11 AM to 11 PM.";
      break;

    case "gaming":
      response = "We offer PC gaming and board games for visitors.";
      break;

    case "food":
      response = "Enjoy snacks, beverages and delicious cafe favourites.";
      break;

    case "location":
      response = "Cafe Mysteria is located in Varanasi.";
      break;

    case "instagram":
      response = "Follow us on Instagram: @mysteria.ig";
      break;
  }

  chatbotBody.innerHTML += `
    <div class="bot-message">${response}</div>
  `;

  chatbotBody.scrollTop = chatbotBody.scrollHeight;
}