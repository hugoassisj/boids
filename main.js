let NUMBER_OF_AGENTS = 10;

let agents = []
let mouse;

function setup() {
  createCanvas(windowWidth, windowHeight - 4);
}

function draw() {
  mouse = createVector(mouseX,mouseY);
  background(220, 220, 220);

  for (let i = 0; i < agents.length; i++) {
    //agents[i].setAngle(45);
    agents[i].update();
    agents[i].show();
    agents[i].seek(mouse);

    for (let j = 0; j < agents.length; j++) {
      //if (i != j && agents[i].checkDist(agents[j])) {
        //agents[i].avoid(agents[j]);
      //}

    }


  }
}

function mousePressed(event) {
  for (let i = 0; i < 1; i++) {
    let a = new Agent(mouseX, mouseY);
    agents.push(a);
    // let a = new Agent(mouseX, mouseY, -40);
    // agents.push(a);
    // a = new Agent(mouseX+ 50, mouseY, 28);
    // agents.push(a);

  }
}






// function doubleClicked(event) {
//   for (let i = 0; i < NUMBER_OF_AGENTS; i++) {
//     let a = new Agent(random(1, windowWidth - 40), random(0, windowHeight - 80), 0);
//     agents.push(a);
//   }
// }