const inputs = document.querySelectorAll(".controls input");

// loop through nodelist and listen for change on the slider
inputs.forEach(input => input.addEventListener("change", handleUpdate));

// continuous update with mouse move
inputs.forEach(input => input.addEventListener("mousemove", handleUpdate));

function handleUpdate() {
  // data-sizing is a custom data attrib, bc spacing and blur has px after them. || '' is for the 3rd that does not have px

  // this === <input id="spacing" type="range" name="spacing" min="10" max="200" value="10" data-sizing="px"> and we change the value of it

  const suffix = this.dataset.sizing || "";
  console.log(this);

  document.documentElement.style.setProperty(
    `--${this.name}`,
    this.value + suffix
  );
}
