// ===========================
// TYPING ANIMATION
// ===========================

const typingText = document.getElementById("typing-text");

const roles = [
  "CAD & Engineering Drawing Enthusiast",
  "Web Developer",
  "EV Technology Learner",
  "Problem Solver"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {

  let currentRole = roles[roleIndex];

  if (!deleting) {

    typingText.textContent =
      currentRole.substring(0, charIndex);

    charIndex++;

    if (charIndex > currentRole.length) {
      deleting = true;
      setTimeout(typeEffect, 1200);
      return;
    }

  } else {

    typingText.textContent =
      currentRole.substring(0, charIndex);

    charIndex--;

    if (charIndex < 0) {
      deleting = false;
      roleIndex =
        (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeEffect, deleting ? 40 : 90);
}

typeEffect();


// ===========================
// DARK LIGHT MODE
// ===========================

const themeBtn =
document.getElementById("theme-toggle");

themeBtn.addEventListener("click", () => {

  document.body.classList.toggle("dark-mode");

  if (
    document.body.classList.contains("dark-mode")
  ) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});

if (
  localStorage.getItem("theme") === "dark"
) {
  document.body.classList.add("dark-mode");
}


// ===========================
// SCROLL REVEAL EFFECT
// ===========================

const revealElements =
document.querySelectorAll(
".section, .project-card, .skill-card"
);

window.addEventListener(
"scroll",
reveal
);

function reveal() {

  revealElements.forEach((el) => {

    const top =
    el.getBoundingClientRect().top;

    const windowHeight =
    window.innerHeight;

    if (
      top <
      windowHeight - 100
    ) {
      el.style.opacity = "1";
      el.style.transform =
      "translateY(0)";
    }
  });
}

reveal();
