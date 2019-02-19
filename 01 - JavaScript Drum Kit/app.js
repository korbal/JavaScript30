window.addEventListener("keydown", playSound);

function playSound(e) {
  const audio = document.querySelector(`audio[data-key='${e.keyCode}']`);
  const key = document.querySelector(`.key[data-key='${e.keyCode}']`);

  if (!audio) return; // stop function from running if no bound key
  audio.currentTime = 0; // rewinds to the beginning of sound
  audio.play();
  key.classList.add("playing"); // adds animation through css class
  // we could do this to remove the animation but it would be out of sync with the css if that changed.
  // setTimeout(function() {
  //   key.classList.remove("playing");
  // }, 200);

  // Instead we use a transition ended listener
  const keys = document.querySelectorAll(".key");
  keys.forEach(key => key.addEventListener("transitionend", removeTransition));
}

function removeTransition(e) {
  //console.log(e);
  if (e.propertyName !== "transform") return; // skip if it's not a transform event, because there are 6 diff events

  this.classList.remove("playing"); // this. means the actual key.
}
