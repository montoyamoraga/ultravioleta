// casiVioleta
// by Nicole L'Huillier + Aarón Montoya-Moraga
// submission to Generative Unfoldings
// October 2020

let url = null;

const oneFrameText = "?frame";
const oneFrameStartIndex = oneFrameText.length;

let rnn;

let currentDecimas = null;

let generating = false;

let temperature = 0.9;

let decimasLines = 10;
let currentLine = 0;
let justDidNewLine = false;

let oneFrame = null;

let paragraph;

let violet;
const violetRed = 68;
const violetGreen = 0;
const violetBlue = 153;

const allChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let flechita = null;

let textMenuSpanish = "ultravioleta | recuerdos imaginarios de una máquina que solo conoce las décimas de violeta parra";
let textMenuEnglish = "ultravioleta | imaginary memories of a machine that only knows the décimas of violet parra";

// when the model is loaded
function modelLoaded() {
  console.log("model loaded!");
  detectOneFrame();
}

function preload() {
  flechita = loadImage("https://raw.githubusercontent.com/montoyamoraga/ultravioleta/main/assets/flechita.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  violet = color(violetRed,violetGreen, violetBlue);

  cursor("https://raw.githubusercontent.com/montoyamoraga/ultravioleta/main/assets/ojito.png");

  rnn = new ml5.charRNN("./models/ultravioleta", modelLoaded);
  
  url = getURL();

  lastPartUrl = url.substring(url.length - oneFrameStartIndex, url.length);
  
  print("lastPartUrl: " + lastPartUrl);

  // paragraph = select("#result");
  // paragraph.html = allChars[int(random(allChars.length))];

  currentDecimas = allChars[int(random(allChars.length))];
}

function draw() {
  background(255);

  push();
  for (let i = 0; i < 255; i++) {
    noStroke();
    fill(violetRed + i,violetGreen + i, violetBlue + i);
    rect(0, 2*i, width, 2);
  }
  pop();

  push();
  textSize(12);
  fill(255);
  noStroke();
  textAlign(RIGHT);
  fill(255);
  text(textMenuSpanish, 97*windowWidth/100, 3*windowHeight/100);
  fill(75*255/100);
  text(textMenuEnglish, 97*windowWidth/100, 5*windowHeight/100);
  pop();

  push();
  imageMode(CENTER);
  image(flechita, 50*windowWidth/100, 5*windowHeight/100);
  pop();

  push();
  textSize(12);
  fill(255);
  noStroke();
  text(currentDecimas, 40*windowWidth/100, 15*windowHeight/100);
  pop();
}

function detectOneFrame() {
  if (lastPartUrl == oneFrameText) {
    oneFrame = true;
    // if oneFrame
    // paragraph = select("#result");
    // rnn.generate({ seed: paragraph.html(),
    rnn.generate({ seed: currentDecimas,
    length: 150,
    temperature: 0.9
    }, (err, results) => {
      console.log(results.sample);
      // let htmlText = "";
      for (let i = 0; i < results.sample.length; i++) {
        if (results.sample[i] == "\n" || results.sample[i] == "\r") {
          // htmlText = htmlText + "<br/>";
          currentDecimas = currentDecimas + "\n";
        }
        else {
          // htmlText = htmlText + results.sample[i];
          currentDecimas = currentDecimas + results.sample[i];
        }
      }
    // paragraph.html(htmlText);
    });  
  } else {
    oneFrame = false;
    generate();
  }
}

function generate() {
  if (generating) {
    generating = false;
  } else {
    generating = true;
    loopRNN();
  }
}

async function loopRNN() {
  while (generating) {
    await predict();
  }
}

async function predict() {

  paragraph = select("#result");
  let next = await rnn.predict(temperature);
  await rnn.feed(next.sample);
  if (next.sample == "\r" || next.sample == "\n") {
    if (!justDidNewLine) {
      // paragraph.html(paragraph.html() + "<br/>");
      currentDecimas = currentDecimas + "\n";
      justDidNewLine = true;
      currentLine = currentLine + 1;
    }
  } else {
    // paragraph.html(paragraph.html() + next.sample);
    currentDecimas = currentDecimas + next.sample;
    justDidNewLine = false;
  }

  if (currentLine > decimasLines - 1) {
    // paragraph.html(paragraph.html() + "<br/>");
    currentDecimas = currentDecimas + "\n";
    justDidNewLine = false;
    currentLine = 0;
    generating = false;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(violet);
}

function mouseClicked() {
  currentDecimas = allChars[int(random(allChars.length))];
  currentLine = 0;
  generating = true;
}