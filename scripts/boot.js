let firstInput = false;
const startMsgBox = document.getElementById("msg-start");
const startMsgTxt = document.getElementById("txt-start-msg");
const btnSkip = document.getElementById("btn-skip");
const txtSkip = document.getElementById("txt-skip");
const currentYear = new Date().getFullYear();

let opacity = 0;
let fadeIn = true;
const fadeStep = 0.01; // fade speed for popup box

window.addEventListener("load", () => {
  // Hide the skip button until boot
  btnSkip.style.opacity = 0;
  txtSkip.style.opacity = 0;

  // Start fading loop
  const fadeInterval = setInterval(() => {
    if (firstInput) {
      btnSkip.style.opacity = 0.5;
      txtSkip.style.opacity = 0.5;

      // Fade out completely then boot
      clearInterval(fadeInterval);
      fadeOutThenBoot();
      return;
    }
    // Fade in/out logic
    if (fadeIn) {
      opacity += fadeStep;
      if (opacity >= 1) {
        opacity = 1;
        fadeIn = false;
      }
    } else {
      opacity -= fadeStep;
      if (opacity <= 0.5) {
        opacity = 0.5;
        fadeIn = true;
      }
    }
    startMsgBox.style.opacity = opacity;
    startMsgTxt.forEach((t) => (t.style.opacity = opacity));
  }, 15);
});

// Trigger boot sequence on keypress or click
window.addEventListener("keypress", () => {
  firstInput = true;
});

window.addEventListener("click", () => {
  firstInput = true;
});

// Fade the popup out then boot
function fadeOutThenBoot() {
  const fadeOutInterval = setInterval(() => {
    opacity -= 0.1;

    if (opacity <= 0) {
      opacity = 0;
      clearInterval(fadeOutInterval);
      Boot();
    }

    startMsgBox.style.opacity = opacity;
    startMsgTxt.forEach((t) => (t.style.opacity = opacity));
  }, 30);
}

function Boot() {
  const bootSound = new Audio("../sounds/boot/boot-sequence.mp3").play();

  const bootLines = [
    { text: "Running Diagnostics\n", delay: 0 },
    { text: "CPU \t\t\t", delay: 0 },
    { text: "PASS\n", delay: 3000 },
    { text: "ROM Module \t\t", delay: 0 },
    { text: "PASS\n", delay: 500 },
    { text: "DMA Timer \t\t", delay: 0 },
    { text: "PASS\n", delay: 150 },
    { text: "DMA Control \t\t", delay: 0 },
    { text: "PASS\n", delay: 150 },
    { text: "Interrupts \t\t", delay: 0 },
    { text: "PASS\n", delay: 100 },
    { text: "RAM \t\t\t", delay: 0 },
    { text: "PASS\n", delay: 200 },
    { text: "RT Clock \t\t", delay: 0 },
    { text: "PASS\n", delay: 100 },
    { text: "MPU \t\t\t", delay: 0 },
    { text: "PASS\n", delay: 500 },
    //Beep
    { text: "Fixed Disk \t", delay: 0 },
    { text: "1 Disk(s) Ready\n", delay: 5000 },
    { text: "Floppy Disk \t", delay: 0 },
    { text: "Not Ready\n", delay: 3000 },

    { text: "\n\nJWS BIOS v1.3\n", delay: 0 },
    { text: `Copyright (C) Jacob Shultz 2005-${currentYear}\n`, delay: 100 },
    { text: "\nBooting Operating System...\n", delay: 1500 },
  ];

  const container = document.getElementById("boot-text");
  let totalDelay = 0;

  bootLines.forEach(({ text, delay }) => {
    totalDelay += delay;
    setTimeout(() => {
      container.textContent += text;
      window.scrollTo(0, document.body.scrollHeight);
      container.style.animation = `fade-in 12s ease-in`;
    }, totalDelay);
  });

  setTimeout(() => {
    window.location.href = "../pages/bio.html";
  }, 17500);

  btnSkip.addEventListener("click", () => {
    window.location.href = "../pages/bio.html";
  });
}
