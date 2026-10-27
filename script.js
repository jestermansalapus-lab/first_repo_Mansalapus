
const body = document.body;

const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const toast = document.getElementById("toast");

// Automatically display the current year.
document.getElementById("year").textContent =
  new Date().getFullYear();

// DARK AND LIGHT MODE
const savedTheme = localStorage.getItem("devfolio-theme");

if (savedTheme === "light") {
  body.classList.add("light");
  themeToggle.textContent = "☀";
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("light");

  const isLight = body.classList.contains("light");

  themeToggle.textContent = isLight ? "☀" : "☾";

  localStorage.setItem(
    "devfolio-theme",
    isLight ? "light" : "dark"
  );

  showToast(
    isLight ? "Light theme enabled" : "Dark theme enabled"
  );
});

// MOBILE NAVIGATION MENU
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close the menu after selecting a section.
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

// SCROLL ANIMATIONS
const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach(element => {
  revealObserver.observe(element);
});

// HIGHLIGHT THE CURRENT NAVIGATION SECTION
const sections = document.querySelectorAll("main section[id]");

const navObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll(".nav-link").forEach(link => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${entry.target.id}`
          );
        });
      }
    });
  },
  { rootMargin: "-35% 0px -55% 0px" }
);

sections.forEach(section => {
  navObserver.observe(section);
});

// CONTACT FORM
document.getElementById("contactForm").addEventListener(
  "submit",
  event => {
    event.preventDefault();

    const name = document
      .getElementById("visitorName").value.trim();

    const email = document
      .getElementById("visitorEmail").value.trim();

    const message = document
      .getElementById("visitorMessage").value.trim();

    // Replace this with your actual email address.
    const recipient = "your.email@example.com";

    const subject = encodeURIComponent(
      `Portfolio message from ${name}`
    );

    const emailBody = encodeURIComponent(
      `Hi,\n\n${message}\n\nFrom: ${name}\nReply to: ${email}`
    );

    showToast("Opening your email app...");

    window.location.href =
      `mailto:${recipient}?subject=${subject}&body=${emailBody}`;
  }
);

// NOTIFICATION MESSAGE
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}
