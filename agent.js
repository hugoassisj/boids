let MAX_VELOCITY = 5;
let MAX_ATTRACT_FORCE = 0.1;

let MAX_REPULSE_FORCE = 0.1;

let LINE_SIZE = 25;

let AGENT_WIDTH = 30;
let AGENT_HEIGTH = 30;

let MAX_RGB = 245;
let MIN_RGB = 100;

let VIEW_RADIUS = 200;

class Agent {
  constructor(x, y) {

    this.position = createVector(x, y);

    this.phi = random(0, 2 * PI);
    //this.heading = radians(theta);

    this.velocity = createVector(cos(this.phi), sin(this.phi));
    this.velocity.normalize().mult(MAX_VELOCITY);

    this.acceleration = createVector(0, 0);

    this.size = createVector(AGENT_WIDTH, AGENT_HEIGTH);

    this.color = createVector(random(MIN_RGB, MAX_RGB), random(MIN_RGB, MAX_RGB), random(MIN_RGB, MAX_RGB));
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
    this.phi = radians(angle);
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
    if ((distance > 0) && (distance <= VIEW_RADIUS)) {
      stroke(255, 0, 0);
      //line(other.pos.x, other.pos.y, this.pos.x, this.pos.y);
      push();
      stroke(1);
      noFill();
      translate(this.position.x, this.position.y);
      ellipse(0, 0, VIEW_RADIUS);

      pop();
      return true;
    } else
      return false

  }

  avoid(target) {
  //   //let desired_1 = createVector(0, 0);
  //   let desired_2 = createVector(0, 0);

  //   //desired_1 = p5.Vector.sub(this.velocity, other.velocity);
  //   //desired_1.normalize().mult(MAX_VELOCITY);

  //   desired_2 = p5.Vector.sub(this.velocity, other.velocity);
  //   desired_2.normalize().mult(MAX_VELOCITY)


  //  // let steer_1 = p5.Vector.sub(desired_1, other.velocity);
  //   //steer_1.limit(MAX_REPULSE_FORCE);

  //   let steer_2 = p5.Vector.sub(this.velocity,  desired_2);
  //   steer_2.limit(MAX_REPULSE_FORCE);

  //   //this.applyForce(steer_1);
  //   other.applyForce(steer_2)

  //   // this.velocity = new_vel_1;
  //   // this.phi = atan2(this.velocity.y, this.velocity.x);

  //   // other.vel = new_vel_2;
  //   // other.heading = atan2(other.vel.y, other.vel.x);

  // let desired = p5.Vector.sub(target.position, this.position);
  // desired.normalize().mult(MAX_VELOCITY);

  // let steer = p5.Vector.sub(desired, this.velocity);
  // steer.limit(MAX_REPULSE_FORCE);

  // this.applyForce(-steer);

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

    //Triangle
    stroke(0);
    fill(this.color.x, this.color.y, this.color.z);
    translate(this.position.x, this.position.y);
    rectMode(CENTER);
    rotate(this.velocity.heading());
    //triangle(-this.size.y, -this.size.x / 2, 0, 0, -this.size.y, this.size.x / 2);                //Origem na Ponta
    triangle(-this.size.x / 2, -this.size.y / 2, this.size.x / 2, 0, -this.size.x / 2, this.size.y / 2); //Origem no Centro

    //Orientation Line 
    stroke(255, 0, 0);
    strokeWeight(2);
    line(0, 0, LINE_SIZE, 0);

    pop();
  }
}

// drawHistory() {
//   for (var i = 0; i < this.history.length; i++) {
//     var dot = this.history[i];
//     ellipse(dot.x, dot.y, 8);
//   }
// }

// avoid() {
//   if ((d > 0) && (d < crowdRadius)) {
//     // Calculate vector pointing away from neighbor
//     PVector diff = PVector.sub(pos, other.pos);
//     diff.normalize();
//     diff.div(d); // Weight by distance
//     steer.add(diff);
//     count++; // Keep track of how many
//   }
// }