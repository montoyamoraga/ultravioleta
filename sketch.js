// 
// by Nicole L'Huillier + Aarón Montoya-Moraga
// submission to Generative unfoldings
// October 2020

let url = null;
let staticFrameURL = "?frame";

function setup() {
  createCanvas(400, 400);
  
  url = getURL();
  
}

function draw() {
  background(220);
  print(url);
}
