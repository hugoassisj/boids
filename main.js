let NUMBER_OF_AGENTS = 10;

let MAX_VELOCITY_Slider;
let MAX_ATTRACT_FORCE_Slider;
let MAX_REPULSE_FORCE_Slider;
let RADIUS_OF_VIEW_Slider;

let RADIUS_OF_VIEW_Checkbox;

let agents = []
let mouse;

let v = 0;
let a = 0;
let r = 0;
let rad = 0;

function setup() {
  createCanvas(windowWidth, windowHeight - 4);
  setupUI();

}

function draw() {

  updateConstants();

  background(180, 180, 180);

  drawUI();

  mouse = createVector(windowWidth / 2, windowHeight / 2); //mouseX,mouseY);

  for (let i = 0; i < agents.length; i++) {
    //agents[i].seek(mouse);
    agents[i].update();
    agents[i].show();
    
    for (let j = 0; j < agents.length; j++) {
      if (i != j && agents[i].checkDist(agents[j])) {
        agents[i].align(agents);
        agents[i].avoid(agents[j]);
      }
    }
  }
}

function mousePressed(event) {
  for (let i = 0; i < 1; i++) {
    let a = new Agent(mouseX, mouseY);
    agents.push(a);
  }
}

function setupUI() {
  textSize(20);

  RADIUS_OF_VIEW_Checkbox = createCheckbox('Show Radius', false);
  RADIUS_OF_VIEW_Checkbox.position(980, windowHeight - 60);
  RADIUS_OF_VIEW_Checkbox.changed(RADIUS_OF_VIEW_Checkbox_Event);

  MAX_VELOCITY_Slider = createSlider(0, 50, 12, 0.05);
  MAX_VELOCITY_Slider.style('width', '200px');
  MAX_VELOCITY_Slider.position(20, windowHeight - 60);

  MAX_ATTRACT_FORCE_Slider = createSlider(0, 5, 0.75, 0.01);
  MAX_ATTRACT_FORCE_Slider.style('width', '200px');
  MAX_ATTRACT_FORCE_Slider.position(260, windowHeight - 60);

  MAX_REPULSE_FORCE_Slider = createSlider(0, 5, 0.85, 0.01);
  MAX_REPULSE_FORCE_Slider.style('width', '200px');
  MAX_REPULSE_FORCE_Slider.position(500, windowHeight - 60);

  RADIUS_OF_VIEW_Slider = createSlider(0, 250, 200, 5);
  RADIUS_OF_VIEW_Slider.style('width', '200px');
  RADIUS_OF_VIEW_Slider.position(740, windowHeight - 60);

}


function updateConstants() {
  v = MAX_VELOCITY_Slider.value();
  a = MAX_ATTRACT_FORCE_Slider.value();
  r = MAX_REPULSE_FORCE_Slider.value();
  rad = RADIUS_OF_VIEW_Slider.value();

  Agent.setConstants(v, a, r, rad);
}

function drawUI() {
  fill(50);
  noStroke();
  text('Max Vel: ' + v, 20, windowHeight - 70);
  text('Max Atract: ' + a, 260, windowHeight - 70);
  text('Max Repulse: ' + r, 500, windowHeight - 70);
  text('Radius: ' + rad, 740, windowHeight - 70);
}



function RADIUS_OF_VIEW_Checkbox_Event() {
  if (this.checked()) {
    Agent.displayRadius(true);
  } else {
    Agent.displayRadius(false);
  }
}