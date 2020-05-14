let maxVelocity = 0
let maxForce = 0

let maxAlign = 0
let maxCohesion = 0
let maxSeparation = 0

let radiusA = 0
let radiusS = 0
let radiusC = 0

let DIRECTION_LINE_SIZE = 15

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

  behave(agents)
  {
    let alignmentForce = this.alignment(agents)
    let cohesionForce = this.cohesion(agents)
    let separationForce = this.separation(agents)

    alignmentForce.mult(maxAlign)
    cohesionForce.mult(maxCohesion)
    separationForce.mult(maxSeparation)

    this.acceleration.add(alignmentForce)
    this.acceleration.add(cohesionForce)
    this.acceleration.add(separationForce)

    //this.drawArrow(this.position, this.acceleration.mult(100), 'red')

  }

  update()
  {
    //Update position
    this.position.add(this.velocity)
    //Update velocity
    this.velocity.add(this.acceleration)
    this.velocity.setMag(maxVelocity)
    //Canvas limits
    this.checkBounds()

    //Reset acceleration each cycle
    this.acceleration.mult(0)
  }

  applyForce(force)
  {
    this.acceleration.mult(0)
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

  insideRadius(other, rad)
  {
    let distance = p5.Vector.dist(this.position, other.position)
    if ((distance > 0) && (distance <= rad))
    {
      if (showRadius)
        this.drawRadius(0, 255, 0, 80, rad)
      return true
    } else
      return false
  }

  alignment(agents)
  {
    let desiredAvgVelocity = createVector()
    let total = 0
    let force = createVector()
    for (let other of agents)
    {
      if (other != this && this.insideRadius(other, radiusA))
      {
        desiredAvgVelocity.add(other.velocity)
        total++
      }
    }
    if (total > 0)
    {
      desiredAvgVelocity.div(total)

      desiredAvgVelocity.sub(this.velocity)
      //desiredAvgVelocity.setMag(maxVelocity)

      force = p5.Vector.sub(desiredAvgVelocity, this.velocity)
      force.limit(maxForce)
    }
    return force
  } 

  cohesion(agents)
  {
    let desiredAvgPosition = createVector()
    let total = 0
    let force = createVector()
    for (let other of agents)
    {
      if (other != this && this.insideRadius(other, radiusC))
      {
        desiredAvgPosition.add(other.position)
        total++
      }
    }

    if (total > 0)
    {
      desiredAvgPosition.div(total)

      desiredAvgPosition.sub(this.position)
      //desiredAvgPosition.setMag(maxVelocity)

      force = p5.Vector.sub(desiredAvgPosition, this.velocity)
      force.limit(maxForce)
    }
    return force
  }

  separation(agents)
  {
    let desiredAvgVelocity = createVector()
    let total = 0
    let force =  createVector()
    for (let other of agents)
    {
      if (other != this && this.insideRadius(other, radiusS))
      {
        let desiredDirection = p5.Vector.sub(this.position, other.position)
        desiredAvgVelocity.add(desiredDirection)

        total++
      }
      if (total > 0)
      {
        desiredAvgVelocity.div(total)
        //desiredAvgVelocity.setMag(maxVelocity)

        force = p5.Vector.sub(desiredAvgVelocity, this.velocity)
        force.limit(maxForce)
      }
    }
    return force
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
    line(0, 0, DIRECTION_LINE_SIZE, 0)

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

  static setConstants(velocitySliderValue, forceSliderValue, alignmentSliderValue, separationSliderValue, cohesionSliderValue, radiusASliderValue, radiusSSliderValue, radiusCSliderValue)
  {
    maxVelocity = velocitySliderValue
    maxForce = forceSliderValue
    maxAlign = alignmentSliderValue
    maxSeparation = separationSliderValue
    maxCohesion = cohesionSliderValue
    radiusA = radiusASliderValue
    radiusS = radiusSSliderValue
    radiusC = radiusCSliderValue
  }

}