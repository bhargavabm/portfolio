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
// VISITOR COUNTER
// ===========================

let visitors =
localStorage.getItem("portfolioVisitors");

if (!visitors) {
  visitors = 1;
} else {
  visitors = Number(visitors) + 1;
}

localStorage.setItem(
  "portfolioVisitors",
  visitors
);

const visitorSection =
document.createElement("div");

visitorSection.innerHTML = `
<section class="section">
<h2>Portfolio Visitors</h2>

<div class="rating-box">

<h1>${visitors}</h1>

<p>Total Visits</p>

</div>
</section>
`;

document.body.insertBefore(
  visitorSection,
  document.querySelector(".thankyou")
);

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
