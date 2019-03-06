const addItems = document.querySelector(".add-items");
const itemsList = document.querySelector(".plates");

// this will try to retrieve data from local storage, if unsuccessful, will start with an empty array
const items = JSON.parse(localStorage.getItem("items")) || [];

addItems.addEventListener("submit", addItem);
itemsList.addEventListener("click", toggleDone);
populateList(items, itemsList);

function addItem(e) {
  e.preventDefault();
  // We can use this, because this is the whole form.
  // this is the text input value
  const text = this.querySelector("[name=item]").value;
  const item = {
    text: text,
    done: false
  };

  items.push(item);
  populateList(items, itemsList);
  localStorage.setItem("items", JSON.stringify(items));
  // clears input box
  this.reset();
}

function populateList(plates = [], platesList) {
  platesList.innerHTML = plates
    .map((plate, i) => {
      return `
    <li>
    <input type="checkbox" data-index=${i} id="item${i}" ${
        plate.done ? "checked" : ""
      } />
      <label for = "item${i}">${plate.text}</label>
    </li>

    `;
    })
    .join("");
}

// this is event delegation, because items are not on the page at start. need to narrow it down what we clicked on
function toggleDone(e) {
  if (!e.target.matches("input")) return;

  // find id which was clicked and set it to done
  const el = e.target;
  const index = el.dataset.index;

  // access the done property and toggles it
  items[index].done = !items[index].done;

  // putting it into local storage
  localStorage.setItem("items", JSON.stringify(items));
  populateList(items, itemsList);
}
