const alphabet = "abcdefghijklmnopqrstuvwxyz";
const parallaxItems = [...document.querySelectorAll(".parallax-text")];

let pointerX = 0;
let pointerY = 0;

function randomWord(length) {
  return Array.from({ length }, () => {
    return alphabet[Math.floor(Math.random() * alphabet.length)];
  }).join("");
}

function randomLine(groups) {
  return groups.map((group) => randomWord(group)).join(" ");
}

function refreshText() {
  parallaxItems.forEach((item) => {
    const groups = (item.dataset.groups ?? "8,8,8")
      .split(",")
      .map((value) => Number.parseInt(value, 10))
      .filter((value) => Number.isFinite(value) && value > 0);

    item.textContent = randomLine(groups);
  });
}

function animate(time) {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const mouseX = centerX === 0 ? 0 : (pointerX - centerX) / centerX;
  const mouseY = centerY === 0 ? 0 : (pointerY - centerY) / centerY;

  parallaxItems.forEach((item, index) => {
    const driftX = Math.sin(time / 700 + index * 1.3) * 7;
    const driftY = Math.cos(time / 900 + index * 1.7) * 4;
    const offsetX = driftX + mouseX * (index + 1) * 4;
    const offsetY = driftY + mouseY * (index + 1) * 3;

    item.style.setProperty("--offset-x", `${offsetX.toFixed(2)}px`);
    item.style.setProperty("--offset-y", `${offsetY.toFixed(2)}px`);
  });

  window.requestAnimationFrame(animate);
}

window.addEventListener("mousemove", (event) => {
  pointerX = event.clientX;
  pointerY = event.clientY;
});

refreshText();
window.setInterval(refreshText, 120);
window.requestAnimationFrame(animate);
