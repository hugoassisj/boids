let MAX_VELOCITY = 5;
let MAX_ATTRACT_FORCE = 0.255;
let MAX_REPULSE_FORCE = 0.35 //0.105;

let DIRECRION_LINE_SIZE = 25;

let AGENT_WIDTH = 30;
let AGENT_HEIGTH = 30;

let MAX_RGB_COLOR_RANGE = 245;
let MIN_RGB_COLOR_RANGE = 100;

let RADIUS_OF_VIEW = 200;

let show = false;

class Agent {
  constructor(x, y) {

    this.position = createVector(x, y);
    this.acceleration = createVector(0, 0);

    this.heading = random(0, 2 * PI);
    //this.heading = radians(theta);

    this.velocity = createVector(cos(this.heading), sin(this.heading));
    this.velocity.normalize().mult(MAX_VELOCITY);

    this.size = createVector(AGENT_WIDTH, AGENT_HEIGTH);

    this.color = createVector(random(MIN_RGB_COLOR_RANGE, MAX_RGB_COLOR_RANGE), random(MIN_RGB_COLOR_RANGE, MAX_RGB_COLOR_RANGE), random(MIN_RGB_COLOR_RANGE, MAX_RGB_COLOR_RANGE));
  }

  update() {
    //Update position
    this.position.add(this.velocity);
    
    //Update velocity
    this.velocity.add(this.acceleration);
    this.velocity.limit(MAX_VELOCITY);

    this.checkBounds();
    // Reset acceleration each cycle
    this.acceleration.mult(0);
  }


  static setConstants(v, a, r, rad) {
    MAX_VELOCITY = v;
    MAX_ATTRACT_FORCE = a;
    MAX_REPULSE_FORCE = r;
    RADIUS_OF_VIEW = rad;
  }



  applyForce(force) {
    this.acceleration.add(force);
  }

  checkBounds() {
    if (this.getPos().y < -this.size.x / 2) {
      this.setPos(this.getPos().x, windowHeight + 40);
    }
    if (this.getPos().x < -25) {
      this.setPos(windowWidth, this.getPos().y);
    }
    if (this.getPos().x > windowWidth) {
      this.setPos(0, this.getPos().y);
    }
    if (this.getPos().y > windowHeight + 40) {
      this.setPos(this.getPos().x, 0);
    }
  }

  setAngle(angle) {
    this.heading = radians(angle);
  }


  getPos() {
    return this.position;
  }

  setPos(x, y) {
    this.position.x = x;
    this.position.y = y;
  }


  checkDist(other) {
    let distance = p5.Vector.dist(other.position, this.position);
    if ((distance > 0) && (distance <= RADIUS_OF_VIEW)) {
      stroke(255, 0, 0);
      push();
      stroke(220,220,220,80);
      noFill();
      translate(this.position.x, this.position.y);
      if(show)
          ellipse(0, 0, RADIUS_OF_VIEW);

      pop();
      return true;
    } else
      return false

  }

  avoid(other) {
    let to_other = createVector();
    let all = createVector();
    to_other = p5.Vector.sub(this.position, other.position);
    to_other.limit(MAX_REPULSE_FORCE);

    all = p5.Vector.add(this.position, to_other)

    this.applyForce(to_other);

    // this.drawArrow(this.position, to_other, 'red');
    // this.drawArrow(this.position, this.velocity, 'blue');


  }

  drawArrow(base, vec, myColor) {
    push();
    stroke(myColor);
    strokeWeight(3);
    fill(myColor);
    translate(base.x, base.y);
    line(0, 0, vec.x, vec.y);
    rotate(vec.heading());
    let arrowSize = 7;
    translate(vec.mag() - arrowSize, 0);
    triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
    pop();
  }

  seek(target) {
    let desired = p5.Vector.sub(target, this.position);
    desired.normalize().mult(MAX_VELOCITY);

    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(MAX_ATTRACT_FORCE);

    this.applyForce(steer);
  }


  align(agents) {
    let desired_velocity = createVector();
    let total = 0;
    for (let other of agents) {
      desired_velocity.add(other.velocity);
      total++;
    }
    if (total > 0)
      desired_velocity.div(total);
    desired_velocity.sub(this.velocity).mult(0.02);
    this.acceleration = desired_velocity;
  }


  show() {
    push();

    //Agent
    stroke(0);
    fill(this.color.x, this.color.y, this.color.z);
    translate(this.position.x, this.position.y);
    rectMode(CENTER);
    rotate(this.velocity.heading());
    //triangle(-this.size.y, -this.size.x / 2, 0, 0, -this.size.y, this.size.x / 2);                      //Frontal Point as Origin
    triangle(-this.size.x / 2, -this.size.y / 2, this.size.x / 2, 0, -this.size.x / 2, this.size.y / 2); //Center Point as Origin

    //Direction Line 
    stroke(255, 0, 0);
    strokeWeight(2);
    line(0, 0, DIRECRION_LINE_SIZE, 0);

    pop();
  }


  static displayRadius(display)
  {
    show = display;
  }


}