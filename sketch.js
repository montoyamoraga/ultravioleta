// nameTODO
// by Nicole L'Huillier + Aarón Montoya-Moraga
// submission to Generative Unfoldings
// October 2020

let url = null;

const oneFrameText = "?frame";
const oneFrameStartIndex = oneFrameText.length;

let isOneFrame = null;

const rnn = new ml5.charRNN("./models/input", modelLoaded);

// when the model is loaded
function modelLoaded() {
  console.log("model loaded!");
}

function setup() {
  createCanvas(400, 400);
  
  url = getURL();

  lastPartUrl = url.substring(url.length - oneFrameStartIndex, url.length);

  detectOneFrame();
  
  print("lastPartUrl: " + lastPartUrl);

  rnn.generate({ seed: 'a',
                length: 300,
                temperature: 0.5
              }, (err, results) => {
    console.log(results);
  });  
}

function draw() {
  background(220);
  ellipse(random(width), random(height), 10, 10);
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
