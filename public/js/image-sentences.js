//Select DOM Elements
const container = document.getElementById("container");
const nav = document.querySelector("nav");
const button = document.querySelectorAll("button");
//Create classes to structure data
class Items {
  constructor(data, numOptions) {
    this.currentElem = 0;
    this.numOptions = numOptions;
    this.body = [];
    this.paths = [];
    this.captions = [];
    //An array with random numbers, according to length
    this.randomArray = randomArray(data.images.length);
    //Fetch essental data as arrays
    for (let i = 0; i < data.images.length; i++) {
      this.paths[i] = data.images[i].path;
      this.captions[i] = data.images[i].caption;
    }
    //Build content body of the app
    for (let i = 0; i < data.images.length; i++) {
      //Make array with image data indexes that are different from the main sentence
      const notArray = this.randomArray.filter(
        (elem) => elem !== this.randomArray[i]
      );
      const shuffledNotArray = shuffle(notArray);
      this.body[i] = {
        randArray: randomArray(this.numOptions),
        sentence: this.captions[this.randomArray[i]],
        options: [],
      };
      for (let j = 1; j < this.numOptions; j++) {
        this.body[i].options[0] = {
          path: this.paths[this.randomArray[i]],
          caption: this.captions[this.randomArray[i]],
        };
        this.body[i].options[j] = {
          path: this.paths[shuffledNotArray[j]],
          caption: this.captions[shuffledNotArray[j]],
        };
      }
    }
  }
  set selectElem(page) {
    this.currentElem = page;
  }
}
//Get filtered data in a promise
async function fetchData(title) {
  try {
    const response = await fetch("data/quizzes.json");
    const data = await response.json();
    return data.filter((object) => object.title === title);
  } catch (error) {
    console.error(error);
  }
}
//MAIN FUNCTION: Render the data
async function renderData(title, numOptions = 4) {
  disableButton();
  const data = await fetchData(title);
  const item = new Items(data[0], numOptions);
  let prevNode = 0;
  //Button Handlers to render body as an array of elems
  nav.addEventListener("click", (e) => {
    if (e.target.className.includes("item-num")) {
      enableButton(prevNode);
      container.innerHTML = "";
      const index = parseInt(e.target.textContent) - 1;
      item.selectElem = index;
      button[index].classList.add("clicked");
      button[prevNode].classList.remove("clicked");
      renderHtml(
        item.body[item.currentElem],
        item.body[item.currentElem].randArray
      );
      disableButton();
      prevNode = index;
    }
  });
  renderHtml(
    item.body[item.currentElem],
    item.body[item.currentElem].randArray
  );
}
//Render the HTML
function renderImages(array, parent, randArray) {
  for (let i = 0; i < array.length; i++) {
    const img = document.createElement("img");
    img.setAttribute("src", array[randArray[i]].path);
    img.setAttribute("class", "option");
    img.setAttribute("data-caption", array[randArray[i]].caption);
    parent.appendChild(img);
  }
}
function renderOptions(images, randArray) {
  const options = document.createElement("div");
  options.setAttribute("class", "options");
  container.appendChild(options);
  renderImages(images, options, randArray);
}
function renderSentence(caption) {
  const sentence = document.createElement("p");
  sentence.textContent = caption;
  sentence.setAttribute("class", "sentence");
  container.appendChild(sentence);
}
function renderHtml(body, randArray) {
  renderSentence(body.sentence);
  renderOptions(body.options, randArray);
}
function randomArray(numElem) {
  const array = [];
  for (let i = 0; i < numElem; i++) {
    array[i] = Math.random();
  }
  const sorted = array.slice().sort((a, b) => a - b);
  const ranks = array.map((v) => sorted.indexOf(v));
  return ranks;
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
//Disable 'clicked' button
function disableButton() {
  button.forEach((elem) => {
    if (elem.classList.contains("clicked")) elem.setAttribute("disabled", "");
  });
}
function enableButton(index) {
  button[index].removeAttribute("disabled");
}
renderData("Grow, Vegetables, Grow");
