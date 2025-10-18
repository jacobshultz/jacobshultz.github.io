// Play roll/flicker animation on screen load. End after a random number of iterations.
window.addEventListener("load", () => {
  const text = document.querySelector(".main-text");
  const rand = Math.random();
  const max = 5000;
  const min = 2000;
  const iterations = (rand * (max - min) + min) / 1000;

  if (rand < 0.25) {
    text.style.animation = `
        roll-a 0.1s ease-in-out ${iterations}, 
        flicker 0.1s linear ${parseInt(iterations) + 3}
    `;
  } else if (rand < 0.5) {
    text.style.animation = `
        roll-b 0.12s ease-in-out ${iterations - iterations / 2}, 
        flicker 0.1s linear ${parseInt(iterations)}
    `;
  } else if (rand < 0.75) {
    text.style.animation = `
        roll-c 0.07s ease-in-out ${iterations}, 
        flicker 0.1s linear ${parseInt(iterations)}
    `;
  } else {
    text.style.animation = `
        roll-d 0.2s ease-in-out ${iterations - iterations / 2}, 
        flicker 0.1s linear ${parseInt(iterations)}
    `;
  }
});
