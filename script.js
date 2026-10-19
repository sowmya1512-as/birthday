const targetDate = new Date("2026-10-22T00:00:00+05:30").getTime();

const textEls = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
  title: document.getElementById("title"),
  lede: document.getElementById("lede"),
  sub: document.getElementById("sub"),
  quote: document.getElementById("quote"),
  dots: document.getElementById("dots")
};

const quotes = [
  "You deserve soft mornings, big hugs, and every happy thing coming your way.",
  "I’ll always be the loudest one cheering for you.",
  "Every photo with you turns out to be my favorite.",
  "You make ordinary days feel like a plan worth keeping.",
  "Pick the outfit now. I already have opinions.",
  "Thank you for being my person."
];

let quoteIndex = 0;
let quoteTimer = null;

function pad(value) {
  return String(value).padStart(2, "0");
}

function updateCountdown() {
  const remaining = Math.max(targetDate - Date.now(), 0);
  const totalSeconds = Math.floor(remaining / 1000);

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  textEls.days.textContent = days;
  textEls.hours.textContent = pad(hours);
  textEls.minutes.textContent = pad(minutes);
  textEls.seconds.textContent = pad(seconds);
}

function setQuote(index) {
  quoteIndex = index;
  textEls.quote.classList.add("fading");

  setTimeout(() => {
    textEls.quote.textContent = quotes[quoteIndex % quotes.length];
    textEls.quote.classList.remove("fading");
    updateDots();
  }, 180);
}

function updateDots() {
  textEls.dots.innerHTML = "";

  quotes.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Quote ${index + 1}`);
    dot.setAttribute("aria-current", index === quoteIndex ? "true" : "false");
    dot.addEventListener("click", () => {
      setQuote(index);
      resetQuoteRotation();
    });
    textEls.dots.appendChild(dot);
  });
}

function resetQuoteRotation() {
  if (quoteTimer) clearInterval(quoteTimer);
  quoteTimer = setInterval(() => {
    setQuote((quoteIndex + 1) % quotes.length);
  }, 4500);
}

updateCountdown();
updateDots();
setQuote(0);
resetQuoteRotation();
setInterval(updateCountdown, 1000);
