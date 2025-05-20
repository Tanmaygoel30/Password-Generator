let barValue = document.querySelector("#slider");
let length = document.querySelector(".lengthNo");

let output = document.querySelector(".output");
let copyMsg = document.querySelector(".copyMsg");

let upperCase = document.querySelector("#check1");
let lowerCase = document.querySelector("#check2");
let number = document.querySelector("#check3");
let symbol = document.querySelector("#check4");

let indicate = document.querySelector(".indicator");

// Match written text length and bar value
barValue.addEventListener("input", () => (length.textContent = barValue.value));

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomNumber() {
  return randomInteger(0, 9);
}

function randomUpperCase() {
  return String.fromCharCode(randomInteger(65, 90));
}

function randomLowerCase() {
  return String.fromCharCode(randomInteger(97, 122));
}

let symbols = [
  "!",
  '"',
  "#",
  "$",
  "%",
  "&",
  "'",
  "(",
  ")",
  "*",
  "+",
  ",",
  "-",
  ".",
  "/",
  ":",
  ";",
  "<",
  "=",
  ">",
  "?",
  "@",
  "[",
  "\\",
  "]",
  "^",
  "_",
  "`",
  "{",
  "|",
  "}",
  "~",
];

function randomSymbol() {
  return symbols[randomInteger(0, symbols.length - 1)];
}

let checkUpper = false;
let checkLower = false;
let checkNumber = false;
let checkSymbol = false;

upperCase.addEventListener("change", () => (checkUpper = upperCase.checked));
lowerCase.addEventListener("change", () => (checkLower = lowerCase.checked));
number.addEventListener("change", () => (checkNumber = number.checked));
symbol.addEventListener("change", () => (checkSymbol = symbol.checked));

function strength() {
  if (barValue.value < 6) {
    if (
      checkUpper ||
      checkLower ||
      checkNumber ||
      checkSymbol ||
      (checkUpper && checkLower) ||
      (checkLower && checkNumber) ||
      (checkNumber && checkSymbol) ||
      (checkUpper && checkNumber) ||
      (checkUpper && checkSymbol) ||
      (checkLower && checkSymbol)
    ) {
      console.log("Weak");
      indicate.style.backgroundColor = "red";
      alert("It's a weak password we suggest you to tick more checkboxes");
    }
  } else if (
    (checkUpper && checkLower && checkNumber && checkSymbol) ||
    (checkUpper && checkLower && checkNumber && barValue.value > 6) ||
    (checkLower && checkNumber && checkSymbol && barValue.value > 6) ||
    (checkUpper && checkNumber && checkSymbol && barValue.value > 6) ||
    (checkUpper && checkLower && checkSymbol && barValue.value > 6)
  ) {
    console.log("Strong");
    indicate.style.backgroundColor = "green";
  } else {
    indicate.style.backgroundColor = "orange";
  }
}

async function copyContent() {
  if (output.textContent) {
    console.log("copied");
    await navigator.clipboard.writeText(output.textContent);
    copyMsg.textContent = "Copied";
    copyMsg.style.border = "2px solid black";

    setTimeout(() => {
      copyMsg.textContent = "";
      copyMsg.style.border = "none";
    }, 2000);
  }
}

function shuffle(arr) {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    let tempIndex1 = randomInteger(0, len - 1);
    let tempIndex2 = randomInteger(0, len - 1);
    let temp = arr[tempIndex1];
    arr[tempIndex1] = arr[tempIndex2];
    arr[tempIndex2] = temp;
  }
  let str = "";
  arr.forEach((element) => (str += element));
  return str;
}

function generate() {
  let result = "";
  let len = barValue.value;
  let count = 0;

  let funcArray = [];

  if (checkUpper) {
    funcArray.push(randomUpperCase);
    result += randomUpperCase();
    count++;
  }

  if (checkLower) {
    funcArray.push(randomLowerCase);
    result += randomLowerCase();
    count++;
  }

  if (checkNumber) {
    funcArray.push(randomNumber);
    result += randomNumber();
    count++;
  }

  if (checkSymbol) {
    funcArray.push(randomSymbol);
    result += randomSymbol();
    count++;
  }

  if (len < count) {
    barValue.value = count;
    length.textContent = barValue.value;
  }

  // for (let i = 0; i < funcArray.length; i++) {
  //   let func = funcArray[i];
  //   result += func();
  // }

  for (let i = 0; i < len - count; i++) {
    let randomIndex = randomInteger(0, funcArray.length - 1);
    result += funcArray[randomIndex]();
  }

  result = shuffle(Array.from(result));
  output.textContent = result;

  strength();
}
