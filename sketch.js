// nameTODO
// by Nicole L'Huillier + Aarón Montoya-Moraga
// submission to Generative Unfoldings
// October 2020

let url = null;

const oneFrameText = "?frame";
const oneFrameStartIndex = oneFrameText.length;

let isOneFrame = null;

function setup() {
  createCanvas(400, 400);
  
  url = getURL();

  lastPartUrl = url.substring(url.length() - 1 - oneFrameStartIndex, url.length() - 1);

  detectOneFrame();

  

  print(lastPartUrl);
  
}

function draw() {
  background(220);
}

function detectOneFrame() {
  if (lastPartUrl == oneFrameText) {
    isOneFrame = true;
  } else {
    isOneFrame = false;
  }
}
