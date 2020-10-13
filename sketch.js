// nameTODO
// by Nicole L'Huillier + Aarón Montoya-Moraga
// submission to Generative Unfoldings
// October 2020

let url = null;
let staticFrameURL = "?frame";

function setup() {
  createCanvas(400, 400);
  
  url = getURL();

  print(url.substring(0, 5))
  
}

function draw() {
  background(220);
  print(url);
}

function detectRequestStaticFrame() {

}
