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

let temperature = 0.5;

let decimasLines = 10;
let currentLine = 0;
let justDidNewLine = false;

let oneFrame = null;

let paragraph;

const allChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// when the model is loaded
function modelLoaded() {
  console.log("model loaded!");
  detectOneFrame();
}

function setup() {
  // createCanvas(windowWidth, windowHeight);

  noCanvas();

  rnn = new ml5.charRNN("./models/input", modelLoaded);
  
  url = getURL();

  lastPartUrl = url.substring(url.length - oneFrameStartIndex, url.length);
  
  print("lastPartUrl: " + lastPartUrl);

  paragraph = select("#result");
  paragraph.html = allChars[int(random(allChars.length))];

}

function draw() {
}

function detectOneFrame() {
  if (lastPartUrl == oneFrameText) {
    oneFrame = true;
      // if oneFrame
    paragraph = select("#result");
    rnn.generate({ seed: 'a',
    length: 200,
    temperature: 0.5
    }, (err, results) => {
      console.log(results.sample);
    // paragraph.html(results.sample);
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
      paragraph.html(paragraph.html() + "<br/>");
      justDidNewLine = true;
      currentLine = currentLine + 1;
    }
  } else {
    paragraph.html(paragraph.html() + next.sample);
    justDidNewLine = false;
  }

  if (currentLine > decimasLines - 1) {
    paragraph.html(paragraph.html() + "<br/>");
    justDidNewLine = false;
    currentLine = 0;
  }
}
