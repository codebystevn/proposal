// Detect if device is mobile
const isMobile = () => {
  return (
    window.innerWidth <= 768 ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    )
  );
};

function createConfetti() {
  const confettiCount = isMobile() ? 20 : 50;
  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.style.left = Math.random() * window.innerWidth + "px";
    confetti.style.top = "-10px";
    confetti.style.background = [
      "#764ba2",
      "#667eea",
      "#ff69b4",
      "#ff1493",
      "#ffd700",
    ][Math.floor(Math.random() * 5)];
    confetti.style.animation = `float ${2 + Math.random()}s ease-in forwards`;
    confetti.style.setProperty("--tx", (Math.random() - 0.5) * 200);
    confetti.style.setProperty("--ty", window.innerHeight + 10);
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 3000);
  }
}

function createFloatingHearts() {
  const heartCount = isMobile() ? 4 : 8;
  for (let i = 0; i < heartCount; i++) {
    const heart = document.createElement("div");
    heart.classList.add("floating-hearts");
    heart.innerHTML = "❤️";
    heart.style.left = Math.random() * 100 + "%";
    heart.style.top = Math.random() * 100 + "%";
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 3000);
  }
}

function handleYes() {
  document.getElementById("main-content").style.display = "none";
  document.getElementById("success").style.display = "block";
  createConfetti();
  createFloatingHearts();
  playSuccess();
}

function handleNo() {
  const noBtn = document.querySelector(".no-btn");

  // Make the button run away on both mobile and desktop
  const randomX = (Math.random() - 0.5) * 200;
  const randomY = (Math.random() - 0.5) * 200;
  noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
}

function playSuccess() {
  try {
    const audioContext = new (
      window.AudioContext || window.webkitAudioContext
    )();
    const notes = [523, 659, 784]; // C, E, G

    notes.forEach((freq, index) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = freq;
      oscillator.type = "sine";

      const startTime = audioContext.currentTime + index * 0.1;
      gainNode.gain.setValueAtTime(0.3, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);

      oscillator.start(startTime);
      oscillator.stop(startTime + 0.3);
    });
  } catch (e) {
    // Audio context not supported, silently fail
    console.log("Audio playback not available");
  }
}

window.addEventListener("load", () => {
  const heartInterval = isMobile() ? 1200 : 800;
  setInterval(() => {
    if (document.getElementById("main-content").style.display !== "none") {
      const heart = document.createElement("div");
      heart.classList.add("floating-hearts");
      heart.innerHTML = "💕";
      heart.style.left = Math.random() * 100 + "%";
      heart.style.top = "100%";
      heart.style.opacity = "0.6";
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 3000);
    }
  }, heartInterval);

  // Prevent double-tap zoom on buttons
  document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("touchend", (e) => {
      e.preventDefault();
      button.click();
    });
  });
});
