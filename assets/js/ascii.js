/******************
Código original por Vamoss:
https://www.openprocessing.org/sketch/818943

******************/

/* PARAMETROS DE ENTRADA */

const paleta = [
  '#000000',
  '#4e57fa',
  '#fd5554',
  '#52fe54',
  '#fbfc01',
  '#57fdfd',
]

const paleta = [
  '#000000',
  '#4e57fa',
  '#fd5554',
  '#52fe54',
  '#fbfc01',
  '#57fdfd',
]

const chars = [  
  '●●●●●○○○○○',
  '%%%%::::....',
  '#%$^&*()_+!',
  '↑↗→↘↓↙←↖',
  '█▓▒░ ',
  '█▊▋▌▍▎▏ ',
  '▖▗▘▙▚▛▜▝▞▟',
  '♠♥♦♣',
];

const emojis = [
  ['📘','📘','📕','📕','📗','📗'],
  ['🖤','🤎','💜','💙','💚','🧡','💛','❤','🤍'],
  ['😭','🙁','😔','😑','😐','🙂','😊','😄','😁'],
  ['🐵','🐶','🐺','🦊','🦝','🐱','🦁','🐯','🐴','🦄','🦓','🐮','🐷','🐗','🦒','🐭','🐹','🐰','🐻','🐨','🐼','🐔','🐸','🐠','🐌','🦋','🐛','🐜','🐝'],
  ['🌹','🌹','🌻','🌼','🌷','🌷'],
  ['⛈','🌤','🌥','🌦','🌧','🌨','🌩'],
  ['🍇','🍉','🍊','🍋','🍌','🍍','🥭','🍎','🍐','🍑','🍒','🍓'],
  ['⚽','⚾','🥎','🏀','🏐','🏈','🏉','🎱'],
  ['📞','📟','📠','🔋','🔌','💻','💽','💾','💿','📀','🧮','🎥','📺','📸','📹','📼'],
]

/* PARAMETROS ASCII */

let symbols;
let chars_index = 2;
let proportion;
let grid_columns, grid_rows;
let grid_size_ref = 30;
let cell_size;
let buffer;
const modes = [
  'noise',
  'camera',
  'draw',
]
let mode = modes[0];
const maxColor = 765;// 255*3

/* PARAMETROS VIDEO */
let camera;
const camWidth = 320;
const camHeight = 240;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
	canvas.parent("p5js-container");

  init();

	textAlign(CENTER, CENTER);
  textSize(cell_size * 0.8);

	// camera = createCapture(VIDEO);
	// camera.size(camWidth, camHeight);
	// camera.hide();

  symbols = [];
  chars.forEach(c => {
    c = c.split('');
    symbols.push(c);
  });
  emojis.forEach(e => {
    symbols.push(e);
  });
  symbols = shuffle(symbols);
}

function draw() {
  chars_index = floor((frameCount * 0.01) % symbols.length);
  
  if( mode == 'noise') {
    for(let x = 0; x < grid_columns; x++) {
      for(let y = 0; y < grid_rows; y++) {
        let n = noise(x*0.07,y*0.07, frameCount*0.007);
        let c = map(n, 0, 0.7, 0, 255);
        buffer.stroke(c);
        buffer.point(x,y);
      }
    }
  }

  if( mode == 'camera') {
    buffer.image(camera, grid_columns, grid_rows);
  }

 	imageToAscii(buffer);
  // image(buffer, width/2, height/2)
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function init() {
  proportion = windowWidth / windowHeight;
  grid_columns = floor(proportion * grid_size_ref);
  cell_size = windowWidth/grid_columns;
  grid_rows = ceil(windowHeight / cell_size);
  buffer = createGraphics(grid_columns, grid_rows);
}

function imageToAscii(c) {
  c.loadPixels();
	background(0);
	for (let j = 0; j < c.height; j++) {
		for (let i = 0; i < c.width; i++) {
			const pixelIndex = ((j * c.width) + i) * 4;
			const r = c.pixels[pixelIndex];
			const g = c.pixels[pixelIndex + 1];
			const b = c.pixels[pixelIndex + 2];
			let glifo_index = floor((r+g+b) / maxColor * (symbols[chars_index].length-1));
      let glifo = symbols[chars_index][glifo_index];
      let cor = floor((r+g+b) / maxColor * (paleta.length-1));
      let x = i * cell_size;
      let y = j * cell_size;
      fill(paleta[cor]);
      strokeWeight(2);
      stroke(paleta[cor]);
      rect(x, y, cell_size, cell_size)

      fill(0);
      noStroke();
			text(glifo, x + cell_size * 0.5, y + cell_size * 0.5);
		}
	}
}