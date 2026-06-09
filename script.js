/* ==========================================
   SRIMAN S — Portfolio JavaScript
   ========================================== */

// ===== EMAILJS INIT =====
(function () {
  try {
    emailjs.init("347sYaCRkBD6y0m21");
  } catch (e) {
    console.warn("EmailJS not initialized.");
  }
})();

// ===== NAVBAR: SCROLL SHADOW + ACTIVE LINK =====
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
  // Scrolled class
  if (window.scrollY > 20) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // Active link highlight
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("open");
  hamburger.classList.toggle("open");
});

// Close menu on nav link click (mobile)
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    hamburger.classList.remove("open");
  });
});

// ===== TYPING EFFECT =====
const typedText = document.getElementById("typed-text");
const words = [
  "Full Stack Developer",
  "Python Developer",
  "AI Enthusiast",
  "Software Developer",
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 90;

function typeLoop() {
  const currentWord = words[wordIndex];

  if (isDeleting) {
    typedText.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50;
  } else {
    typedText.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 90;
  }

  if (!isDeleting && charIndex === currentWord.length) {
    typingSpeed = 1800; // Pause at end
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    typingSpeed = 400;
  }

  setTimeout(typeLoop, typingSpeed);
}

typeLoop();

// ===== SCROLL REVEAL ANIMATION =====
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger delay based on sibling index
        const siblings = Array.from(entry.target.parentElement.children);
        const idx = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = `${idx * 80}ms`;
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealElements.forEach((el) => revealObserver.observe(el));

// ===== CONTACT FORM =====
const form = document.getElementById("contact-form");
const submitBtn = document.getElementById("submit-btn");
const btnText = document.getElementById("btn-text");
const btnLoader = document.getElementById("btn-loader");
const formStatus = document.getElementById("form-status");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  // Basic validation
  if (!name || !email || !subject || !message) {
    showStatus("Please fill in all fields.", "error");
    return;
  }

  if (!isValidEmail(email)) {
    showStatus("Please enter a valid email address.", "error");
    return;
  }

  // Loading state
  btnText.classList.add("hidden");
  btnLoader.classList.add("visible");
  btnLoader.classList.remove("hidden");
  submitBtn.disabled = true;
  hideStatus();

  const templateParams = {
    from_name: name,
    from_email: email,
    subject: subject,
    message: message,
    to_email: "sriman20102004@gmail.com",
  };

  emailjs
    .send("service_d71x11g", "template_bqj3k7p", templateParams)
    .then(() => {
      showStatus(
        "✅ Message sent successfully! I will get back to you soon.",
        "success"
      );
      form.reset();
    })
    .catch(() => {
      showStatus(
        "❌ Unable to send message. Please try again later.",
        "error"
      );
    })
    .finally(() => {
      btnText.classList.remove("hidden");
      btnLoader.classList.remove("visible");
      btnLoader.classList.add("hidden");
      submitBtn.disabled = false;
    });
});

function showStatus(msg, type) {
  formStatus.textContent = msg;
  formStatus.className = "form-status " + type;
}

function hideStatus() {
  formStatus.className = "form-status";
  formStatus.textContent = "";
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ===== SMOOTH SCROLL for anchor links =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top =
        target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  });
});

// ===== CERTIFICATE IMAGE MODAL =====
function openCertImage(imgId) {
  const img = document.getElementById(imgId);
  const modal = document.getElementById("cert-modal");
  const modalImg = document.getElementById("cert-modal-img");

  if (!img || !modal || !modalImg) return;

  const src = img.getAttribute("src");
  if (!src) return;

  modalImg.src = src;
  modalImg.alt = img.alt;
  modal.classList.add("active");
  document.body.style.overflow = "hidden";

  // Show error message if image not found
  modalImg.onerror = function () {
    modalImg.style.display = "none";
    if (!document.getElementById("cert-modal-error")) {
      const msg = document.createElement("p");
      msg.id = "cert-modal-error";
      msg.style.cssText =
        "text-align:center;padding:40px 20px;color:var(--muted);font-size:14px;";
      msg.innerHTML =
        '📂 Image not found.<br><br>Add your certificate image to<br><code style="background:#EFF6FF;color:var(--primary);padding:4px 8px;border-radius:4px;font-size:12px;">' +
        src +
        "</code>";
      modalImg.parentNode.appendChild(msg);
    }
  };
  modalImg.style.display = "block";
  const errEl = document.getElementById("cert-modal-error");
  if (errEl) errEl.remove();
}

function closeCertModal() {
  const modal = document.getElementById("cert-modal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// Close modal on Escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeCertModal();
});
