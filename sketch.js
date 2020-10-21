// casiVioleta
// by Nicole L'Huillier + Aarón Montoya-Moraga
// submission to Generative Unfoldings
// October 2020

let url = null;

const oneFrameText = "?frame";
const oneFrameStartIndex = oneFrameText.length;

let isOneFrame = null;

let rnn;

let currentDecimas = null;

let generating = false;

let temperature = 0.5;

let decimasLines = 10;
let currentLine = 0;
let justDidNewLine = false;

// when the model is loaded
function modelLoaded() {
  console.log("model loaded!");
  generate();
}

function setup() {
  // createCanvas(windowWidth, windowHeight);

  noCanvas();
  
  url = getURL();

  lastPartUrl = url.substring(url.length - oneFrameStartIndex, url.length);

  detectOneFrame();
  
  print("lastPartUrl: " + lastPartUrl);

  rnn = new ml5.charRNN("./models/input", modelLoaded);


  textAlign(CENTER);

}

function draw() {
  // background(255);
  // if (currentDecimas != null) {
  //   text(currentDecimas.sample, windowWidth/2, windowHeight/4);
  // }
  
  // rnn.generate({ seed: 'a',
  //               length: 200,
  //               temperature: 0.5
  //             }, (err, results) => {
  //   console.log(results);
  //   currentDecimas = results;
  // });

}

function detectOneFrame() {
  if (lastPartUrl == oneFrameText) {
    isOneFrame = true;
    noLoop();
  } else {
    isOneFrame = false;
    loop();
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
  let par = select("#result");
  let next = await rnn.predict(temperature);
  await rnn.feed(next.sample);
  if (next.sample == "\r" || next.sample == "\n") {
    if (!justDidNewLine) {
      par.html(par.html() + "<br/>");
      justDidNewLine = true;
      currentLine = currentLine + 1;
    }
  } else {
    par.html(par.html() + next.sample);
    justDidNewLine = false;
  }

  if (currentLine > decimasLines - 1) {
    par.html(par.html() + "<br/> <br/>");
    justDidNewLine = false;
    currentLine = 0;
  }
  
}
