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

const allChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// when the model is loaded
function modelLoaded() {
  console.log("model loaded!");
  detectOneFrame();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // createCanvas(100, 100);
  

  violet = color(68, 0, 153);

  background(violet);

  // noCanvas();

  cursor("assets/ojito.cur");
  // cursor(CROSS);

  rnn = new ml5.charRNN("./models/ultraVioleta", modelLoaded);
  
  url = getURL();

  lastPartUrl = url.substring(url.length - oneFrameStartIndex, url.length);
  
  print("lastPartUrl: " + lastPartUrl);

  // paragraph = select("#result");
  // paragraph.html = allChars[int(random(allChars.length))];

  currentDecimas = allChars[int(random(allChars.length))];

}

function draw() {
  text(currentDecimas, 10, 10);
}

function detectOneFrame() {
  if (lastPartUrl == oneFrameText) {
    oneFrame = true;
      // if oneFrame
    // paragraph = select("#result");
    // rnn.generate({ seed: paragraph.html(),
    rnn.generate({ seed: currentDecimas,
    length: 150,
    temperature: 0.7
    }, (err, results) => {
      console.log(results.sample);
      let htmlText = "";
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

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
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
  }
}
