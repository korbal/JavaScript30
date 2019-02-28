const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');

console.log(checkboxes);

let lastChecked;

function handleCheck(e) {
  // check if shift is held down AND if they are actually checking a new box

  let inBetween = false;

  if (e.shiftKey && this.checked) {
    // loop over every single checkbox
    checkboxes.forEach(checkbox => {
      if (checkbox === this || checkbox === lastChecked) {
        inBetween = !inBetween;
        console.log("starting to check them inbetween");
      }

      if (inBetween) {
        checkbox.checked = true;
      }
    });
  }

  // this is the checkbox that lastly was clicked
  lastChecked = this;
}

checkboxes.forEach(checkbox => checkbox.addEventListener("click", handleCheck));
