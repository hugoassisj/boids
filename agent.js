let maxVelocity = 6.2
let maxAttractionForce = 0.3
let maxRepulsionForce = 0.38

let repulsionRadius = 85
let attractionRadius = 250

let DIRECRION_LINE_SIZE = 15

let agentWidth = 30
let agentHeigth = 30

let maxRGB = 245
let minRGB = 100

let showRadius = false

class Agent 
{
  constructor(x, y)
  {

    this.position = createVector(x, y)

    this.acceleration = createVector(0, 0)

    this.heading = random(0, 2 * PI)
    //this.heading = radians(95)

    this.velocity = createVector(cos(this.heading), sin(this.heading))
    this.velocity.normalize().mult(maxVelocity)

    this.size = createVector(agentWidth, agentHeigth)

    this.color = createVector(random(minRGB, maxRGB), random(minRGB, maxRGB), random(minRGB, maxRGB))
  }

  update()
  {
    //Update position
    this.position.add(this.velocity)

    //Update velocity
    this.velocity.add(this.acceleration)
    //this.velocity.limit(MAX_VELOCITY)
    this.velocity.normalize().mult(maxVelocity)

    //Canvas limits
    this.checkBounds()

    //Reset acceleration each cycle
    this.acceleration.mult(0)

  }

  applyForce(force)
  {
    //this.drawArrow(this.position, force, 'white')
    this.acceleration.add(force)

  }

  checkBounds()
  {
    if (this.position.y < - this.size.x / 2)
    {
      this.position.y = windowHeight + 40
    }
    if (this.position.x < -25)
    {
      this.position.x = windowWidth
    }
    if (this.position.x > windowWidth)
    {
      this.position.x = 0
    }
    if (this.position.y > windowHeight + 40)
    {
      this.position.y = 0
    }
  }

  checkRepulsionDistance(other)
  {
    let distance = p5.Vector.dist(this.position, other.position)
    if ((distance > 0) && (distance <= repulsionRadius))
    {
      if (showRadius)
        this.drawRadius(255, 0, 0, 50, repulsionRadius)
      return true
    } else
      return false
  }

  checkAttractionDistance(other)
  {
    let distance = p5.Vector.dist(this.position, other.position)
    if ((distance > 0) && (distance <= attractionRadius))
    {
      if (showRadius)
        this.drawRadius(0, 255, 0, 50, attractionRadius)
      return true
    } else
      return false
  }

  attract(targetPosition)
  {
    let desiredDirection = p5.Vector.sub(targetPosition, this.position)
    desiredDirection.normalize().mult(maxVelocity)

    let force = p5.Vector.sub(desiredDirection, this.velocity)
    force.limit(maxAttractionForce)

    this.applyForce(force)
  }

  avoid(other)
  {
    let desiredDirection = p5.Vector.sub(this.position, other.position)
    desiredDirection.normalize().mult(maxVelocity)

    let force = p5.Vector.add(desiredDirection, this.velocity)
    force.limit(maxRepulsionForce/ (p5.Vector.mag(desiredDirection) ^ 2))

    this.applyForce(force)

    //this.drawArrow(this.position, steer.mult(100), 'white')
  }

  align(agents)
  {
    let desiredVelocity = createVector()
    let total = 0
    for (let other of agents)
    {
      desiredVelocity.add(other.velocity)
      total++
    }
    if (total > 0)
      desiredVelocity.div(total)

    desiredVelocity.sub(this.velocity)
    desiredVelocity.normalize().mult(maxVelocity)

    let steer = p5.Vector.sub(desiredVelocity, this.velocity)
    steer.limit(maxAttractionForce)

    this.applyForce(steer)
  }

  gather(agents)
  {
    let desiredPosition = createVector()
    let total = 0
    for (let other of agents)
    {
      desiredPosition.add(other.position)
      total++
    }
    if (total > 0)
      desiredPosition.div(total)

    desiredPosition.sub(this.position)
    desiredPosition.normalize().mult(maxVelocity)

    let vel = p5.Vector.sub(desiredPosition, this.position)
    vel.limit(maxAttractionForce)

    this.applyForce(vel)
  }

  show()
  {
    push()

    //Agent
    stroke(0)
    fill(this.color.x, this.color.y, this.color.z)
    translate(this.position.x, this.position.y)
    rectMode(CENTER)
    rotate(this.velocity.heading())
    triangle(- this.size.x / 2, - this.size.y / 2, this.size.x / 2, 0, - this.size.x / 2, this.size.y / 2)//Center Point as Origin

    //Direction Line 
    stroke(255, 0, 0)
    strokeWeight(2)
    line(0, 0, DIRECRION_LINE_SIZE, 0)

    pop()
  }

  drawRadius(r, g, b, o, rad)
  {
    push()
    stroke(r, g, b, o)
    noFill()
    translate(this.position.x, this.position.y)
    ellipse(0, 0, rad)
    pop()
  }

  drawArrow(base, vec, myColor)
  {
    push()
    stroke(myColor)
    //strokeWeight(3)
    fill(myColor)
    translate(base.x, base.y)
    line(0, 0, vec.x, vec.y)
    rotate(vec.heading())
    let arrowSize = 8
    translate(vec.mag() - arrowSize, 0)
    triangle(0, arrowSize / 2, 0, - arrowSize / 2, arrowSize, 0)
    pop()
  }

  static displayRadius(display)
  {
    showRadius = display
  }

  static setConstants(velocitySliderValue, attractionForceSliderValue, attractionRadiusSliderValue, repulsionForceSliderValue, repulsionRadiusSliderValue)
  {
    maxVelocity = velocitySliderValue
    maxAttractionForce = attractionForceSliderValue
    attractionRadius = attractionRadiusSliderValue
    maxRepulsionForce = repulsionForceSliderValue
    repulsionRadius = repulsionRadiusSliderValue
  }

}