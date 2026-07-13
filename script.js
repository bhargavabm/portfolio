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
// REVIEW SYSTEM
// ===========================

const stars =
document.querySelectorAll(".star");

let selectedRating = 0;

stars.forEach((star) => {

  star.addEventListener("click", () => {

    selectedRating =
      star.getAttribute("data-value");

    stars.forEach((s) => {
      s.classList.remove("active");
    });

    for (
      let i = 0;
      i < selectedRating;
      i++
    ) {
      stars[i].classList.add("active");
    }
  });
});


// ===========================
// SAVE REVIEW
// ===========================

const submitBtn =
document.getElementById("submitReview");

const reviewsContainer =
document.getElementById("reviewsContainer");

submitBtn.addEventListener(
  "click",
  saveReview
);

function saveReview() {

  const name =
  document.getElementById("reviewName")
  .value;

  const review =
  document.getElementById("reviewText")
  .value;

  if (
    name === "" ||
    review === "" ||
    selectedRating === 0
  ) {
    alert(
      "Please enter review and rating."
    );
    return;
  }

  const reviewData = {
    name,
    review,
    rating: selectedRating
  };

  let reviews =
  JSON.parse(
    localStorage.getItem("reviews")
  ) || [];

  reviews.push(reviewData);

  localStorage.setItem(
    "reviews",
    JSON.stringify(reviews)
  );

  loadReviews();

  document.getElementById(
    "reviewName"
  ).value = "";

  document.getElementById(
    "reviewText"
  ).value = "";

  stars.forEach((s) => {
    s.classList.remove("active");
  });

  selectedRating = 0;
}


// ===========================
// LOAD REVIEWS
// ===========================

function loadReviews() {

  let reviews =
  JSON.parse(
    localStorage.getItem("reviews")
  ) || [];

  reviewsContainer.innerHTML = "";

  let totalRating = 0;

  reviews.forEach((item) => {

    totalRating +=
    Number(item.rating);

    const card =
    document.createElement("div");

    card.className =
    "review-card";

    card.innerHTML = `

      <h3>${item.name}</h3>

      <div class="stars">
      ${"★".repeat(item.rating)}
      </div>

      <p>${item.review}</p>

    `;

    reviewsContainer.appendChild(card);
  });

  updateAverage(
    totalRating,
    reviews.length
  );
}


// ===========================
// AVG RATING
// ===========================

function updateAverage(
  total,
  count
) {

  const avgRating =
  document.getElementById(
    "avgRating"
  );

  const reviewCount =
  document.getElementById(
    "reviewCount"
  );

  if (count === 0) {

    avgRating.textContent = "5.0";

    reviewCount.textContent =
      "Based on 0 Reviews";

    return;
  }

  let avg =
  (total / count).toFixed(1);

  avgRating.textContent = avg;

  reviewCount.textContent =
    `Based on ${count} Reviews`;
}

loadReviews();


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
