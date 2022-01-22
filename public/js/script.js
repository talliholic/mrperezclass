const container = document.getElementById("container");
const button = document.querySelector("button");

const numQuestions = 9;
const numItems = 4;
const numArray = [];
const toRender = [];
const numQArray = [];
let page = 0;
for (let i = 0; i < numQuestions; i++) {
  numQArray[i] = i;
}
button.addEventListener("click", () => {
  container.innerHTML = "";
  render("Grow, Vegetables, Grow");
});
let randArray;

function render(title) {
  fetch("data/quizzes.json").then((response) => {
    response.json().then((data) => {
      const info = data.filter((object) => object.title === title);
      const items = shuffle(info[0].images);

      for (let i = 0; i < numQuestions; i++) {
        toRender[i] = { sentence: items[i].caption, images: [], captions: [] };
        const filterArray = shuffle(numQArray.filter((elem) => elem !== i));
        for (let j = 1; j < numItems; j++) {
          toRender[i].images[0] = items[i].path;
          toRender[i].captions[0] = items[i].caption;
          toRender[i].images[j] = items[filterArray[j]].path;
          toRender[i].captions[j] = items[filterArray[j]].caption;
        }
      }
      for (let i = 0; i < numItems; i++) {
        numArray[i] = i;
        if (i === numItems - 1) {
          randArray = shuffle(numArray);
        }
      }
      buildDiv("sentence", container, toRender[page].sentence);
      const options = buildDiv("options", container);
      buildOptions(
        toRender[page].images,
        options,
        toRender[page].captions,
        randArray
      );
    });
  });
}

function buildImg(path, parent, data) {
  const img = document.createElement("img");
  img.setAttribute("class", "option");
  img.setAttribute("data", data);
  img.setAttribute("src", path);
  parent.appendChild(img);
}

function buildDiv(clase, parent, txt) {
  const element = document.createElement("div");
  element.textContent = txt;
  element.setAttribute("class", clase);
  parent.appendChild(element);
  return element;
}

function buildOptions(pathArray, parent, dataArray, randArray) {
  for (let i = 0; i < pathArray.length; i++) {
    buildImg(pathArray[randArray[i]], parent, dataArray[randArray[i]]);
  }
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

render("Grow, Vegetables, Grow");
