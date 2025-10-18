const fileLoc = "../sounds/static/";
const lastNum = parseInt(sessionStorage.getItem("lastNum") ?? "-1");

// Play a random static sound on page load
window.addEventListener("load", () => {
  let rand;

  do {
    rand = Math.floor(Math.random() * 14);
  } while (rand === lastNum); // Don't play the same sound twice.

  new Audio(`${fileLoc}${rand}.mp3`).play();
  sessionStorage.setItem("lastNum", rand);
});
