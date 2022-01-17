const container = document.getElementById("container");

const captions = [];
const imagePaths = [];
const numItems = 4;
const numArray = [];
let randArray;
const optionRand = Math.floor(Math.random() * numItems);

function render(title) {
  fetch("data/quizzes.json").then((response) => {
    response.json().then((data) => {
      const info = data.filter((object) => object.title === title);
      const items = shuffle(info[0].images);
      const sentence = items[0].caption;
      //Control how many options to render
      for (let i = 0; i < numItems; i++) {
        captions[i] = items[i].caption;
        imagePaths[i] = items[i].path;
        numArray[i] = i;
        if (i === numItems - 1) {
          randArray = shuffle(numArray);
        }
      }
      console.log(randArray);
      buildDiv("sentence", container, sentence);
      const options = buildDiv("options", container);
      buildOptions(imagePaths, options, captions, randArray);
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

function builElem(elem, clase, parent) {
  const element = document.createElement(elem);
  element.setAttribute("class", clase);
  parent.appendChild(element);
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
