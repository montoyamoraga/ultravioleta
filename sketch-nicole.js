// by Nicole L'Huillier + Aarón Montoya-Moraga
// November 2020

let probability = 0.05;

let url = null;

let currentDecimas = null;
let currentDecimasPlaceHolder = "loading...";

let rnn;
let generating = false;
let temperature = 0.9;

let decimasLines = 10;
let currentLine = 0;
let justDidNewLine = false;

let violet = null;
const violetRed = 68;
const violetGreen = 0;
const violetBlue = 153;

const allChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let myWords = ["bacán",
  "colectivo",
  "ojos",
  "ocular",
  "perdigones",
  "memoria",
  "tecnología",
  "detector",
  "dispositivo",
  "ciencia",
  "oráculo",
  "realidad",
  "derechos medioambientales",
  "medioambiente",
  "naturaleza",
  "más-que-humanos",
  "alienígena",
  "nave espacial",
  "telepresencia",
  "agua",
  "sequía",
  "extracción",
  "ACAB",
  "sipo",
  "apruebo",
  "constitución",
  "cuir",
  "aborto",
  "hambre",
  "derechos",
  "justicia",
  "justicia social",
  "justicia medioambiental",
  "derechos del agua",
  "derechos de la tierra",
  "metro",
  "eclipse",
  "solsticio",
  "cambio",
  "cacerolazo",
  "cooperación",
  "colaboración",
  "las tesis",
  "matria",
  "con todo",
  "resistencia",
  "virus",
  "aire",
  "respirar",
  "resonar",
  "cuerpa",
  "crisis",
  "dignidad",
  "pandemia",
  "renuncien",
  "litio",
  "desierto",
  'telescopio',
  "antena",
  "sequedad",
  "extinción",
  "regeneración",
  "renovación",
  "detención",
  "delfines", 
  "puma",
  "guanaco",
  "zorrillo",
  "paco",
  "zoom",
  "digital",
  "cyborg",
  "bioticos",
  "mascarilla",
  "manifestación",
  "pluriverso",
  "plurinacional",
  "primera linea",
  "laser",
  "drone",
  "la nube",
  "wifi",
  "internet",
  "futuro",
  "ancestral",
  "economía circular",
  "tiempo circular",
  "no lineal",
  "5G",
  "transducción",
  "energías limpias",
  "inteligencia colectiva",
  "levitación ultrasonica",
  "simpoeisis",
  "trance",
  "tecno"
];

let flechita = null;

let ojito = null; 

let textMenuSpanish = "ultravioleta | recuerdos imaginarios de una máquina que solo sabe las décimas de violeta parra";
let textMenuEnglish = "ultravioleta | imaginary  memories of a  machine that only knows  the décimas of violeta parra";

let textCredits = "nicole l'huillier & aarón montoya-moraga | 2020"

let myFont = null;

// when the model is loaded
function modelLoaded() {
  console.log("model loaded!");
  generate();
}

function preload() {
  flechita = loadImage("https://raw.githubusercontent.com/montoyamoraga/ultravioleta/main/assets/flechita.png");
  ojito = loadImage("https://raw.githubusercontent.com/montoyamoraga/ultravioleta/main/assets/ojito.png");
  myFont = loadFont('assets/Monaco.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  violet = color(violetRed,violetGreen, violetBlue);

  noCursor();

  rnn = new ml5.charRNN("./models/nicole", modelLoaded);
    
  currentDecimas = allChars[int(random(allChars.length))];
}

function draw() {

  // white background
  background(255);

  // purple header
  push();
  for (let i = 0; i < 255; i++) {
    noStroke();
    fill(violetRed + i,violetGreen + i, violetBlue + i);
    rect(0, 2*i, width, 2);
  }
  pop();

  // title
  push();
  textSize(10);
  fill(255);
  noStroke();
  textAlign(RIGHT);
  fill(255);
  textFont(myFont);
  text(textMenuSpanish, 97*windowWidth/100, 5*windowHeight/100);
  fill(75*255/100);
  text(textMenuEnglish, 97*windowWidth/100, 7*windowHeight/100);
  pop();

  // arrow image
  push();
  imageMode(CENTER);
  image(flechita, 50*windowWidth/100, 15*windowHeight/100, 50, 50);
  pop();

  // add credits on the bottom
  push();
  textSize(10);
  fill(255);
  noStroke();
  textAlign(RIGHT);
  fill(violet);
  textFont(myFont);
  text(textCredits, 97*windowWidth/100, 95*windowHeight/100);
  pop();

  // display generated text
  push();
  textSize(12);
  textAlign(CENTER);
  fill(255);
  noStroke();
  textFont(myFont);
  if (currentDecimas.length > 1) {
    text(currentDecimas, 50*windowWidth/100, 25*windowHeight/100);
  } else {
    text(currentDecimasPlaceHolder, 40*windowWidth/100, 25*windowHeight/100);
  }
  pop();

  // cursor
  image(ojito, mouseX, mouseY, 654/10, 264/10);
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


  let next = await rnn.predict(temperature);
  await rnn.feed(next.sample);

  if (next.sample == "\r" || next.sample == "\n") {
    if (!justDidNewLine) {
      currentDecimas = currentDecimas + "\n";
      justDidNewLine = true;
      currentLine = currentLine + 1;
    }
  }
  else if (next.sample == " ") {
    if (Math.random() < probability) {
      currentDecimas = currentDecimas + next.sample + myWords[Math.floor(Math.random() * myWords.length)] + " ";
    } else {
      currentDecimas = currentDecimas + next.sample;
    }
  }
  else {
    currentDecimas = currentDecimas + next.sample;
    justDidNewLine = false;
  }

  if (currentLine > decimasLines - 1) {
    currentDecimas = currentDecimas + "\n";
    justDidNewLine = false;
    currentLine = 0;
    generating = false;
  }


}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mouseClicked() {
  currentDecimas = allChars[int(random(allChars.length))];
  currentLine = 0;
  generating = true;
}
