let numberOfAgents = 100
let numberOfObstacles = 1
let numberOfGoals = 1

let flock = []
let obstacles = []
let goals = []
let wall = []

let tool = 'agent'

let canvasX
let canvasY

// UI Settings---------------------------------------------------------------------------------------------------
// Slider Objects
let velocitySlider

let forceSlider

let alignmentSlider
let separationSlider
let cohesionSlider

let radiusASlider
let radiusSSlider
let radiusCSlider

let showRadiusCheckbox

// Slider Values
let velocitySliderValue = 0
let forceSliderValue = 0

let alignmentSliderValue = 0
let separationSliderValue = 0
let cohesionSliderValue = 0

let radiusASliderValue = 0
let radiusSSliderValue = 0
let radiusCSliderValue = 0

let sliderWidth = 120
let sliderSpacing = 15
let firstSliderX = 20
let sliderY
let textY
// --------------------------------------------------------------------------------------------------------------


// Setup Function -----------------------------------------------------------------------------------------------
function setup()
{
  canvasX = windowWidth
  canvasY = windowHeight - 4

  sliderY = windowHeight - 60
  textY = sliderY - 10

  createCanvas(canvasX, canvasY)

  setupUI()

  //createWall()
}

// Draw Function ------------------------------------------------------------------------------------------------
function draw()
{
  updateConstants()

  background(50, 50, 50)

  drawUI()

  // //Update and Draw
  // for (let i = 0; i < obstacles.length; i++)
  // {
  //   obstacles[i].show()
  // }

  // //Update and Draw
  // for (let i = 0; i < wall.length; i++)
  // {
  //   wall[i].show()
  // }

  // //Update and Draw
  // for (let i = 0; i < goals.length; i++)
  // {
  //   goals[i].show()
  // }

  //Check Interactions
  for (let agent of flock)
  {
    agent.behave(flock)
    agent.update()
    agent.show()

    // //Between Agents and Obstacles
    // for (let j = 0; j < obstacles.length; j++)
    // {
    //   if (obstacles[j].insideOrbit(flock[i]))
    //   {
    //     obstacles[j].act(flock[i])
    //   }
    // }

    // //Between Agents and Walls
    // for (let j = 0; j < wall.length; j++)
    // {
    //   if (wall[j].insideOrbit(agents[i]))
    //   {
    //     wall[j].act(agents[i])
    //   }
    // }

    // //Between Agents and Goals
    // for (let j = 0; j < goals.length; j++)
    // {
    //   if (goals[j].insideOrbit(agents[i]))
    //   {
    //     goals[j].act(agents[i])

    //     let dist = p5.Vector.dist(agents[i].position, goals[j].position)
    //     if ((dist > 0) && (dist <= 5))
    //     {
    //       agents.splice(i, 1)
    //       break
    //     }
    //   }
    // }

  }





}

// Handles mouse click ---------------------------------------------------------------------------------
function mousePressed(event)
{
  if (mouseY < windowHeight - 60)
  {
    switch (tool)
    {
      case 'agent':
        for (let i = 0; i < numberOfAgents; i++)
        {
          flock.push(new Agent(random(0, windowWidth), random(0, windowHeight)))
          //flock.push(new Agent(mouseX, mouseY))
        }
        break

      case 'obstacle':
        for (let i = 0; i < numberOfObstacles; i++)
        {
          obstacles.push(new Force(mouseX, mouseY, 30, 200, 'repel', 15))
          //obstacles.push(new Obstacle(random(0, windowWidth), random(0, windowHeight), 30, 100, 'repel', 30))
        }
        break

      case 'goal':
        for (let i = 0; i < numberOfGoals; i++)
        {
          goals.push(new Force(mouseX, mouseY, 30, 1200, 'attract', 50))
          //goals.push(new Obstacle(random(0, windowWidth), random(0, windowHeight) 30, 100, 'attract', 50))
        }
        break
      default:
        tool = 'agent'
        break
    }

  }
}

//Handle keypress events ----------------------------------------------------------------------------------------
function keyPressed()
{
  if (key == 'a')
  {
    tool = 'agent'
  } else if (key == 'q')
  {
    tool = 'obstacle'
  } else if (key == 'w')
  {
    tool = 'goal'
  }
}

// Configure the position and apeareance of UI Elements ---------------------------------------------------------
function setupUI()
{
  textSize(12)

  velocitySlider = createSlider(0, 15, 3.4, 0.01)
  velocitySlider.style('width', str(sliderWidth) + 'px')
  velocitySlider.position(firstSliderX, sliderY)

  forceSlider = createSlider(0, 5, 0.1, 0.0001)
  forceSlider.style('width', str(sliderWidth) + 'px')
  forceSlider.position(firstSliderX + sliderWidth + sliderSpacing, sliderY)

  alignmentSlider = createSlider(0, 2, 1.48, 0.0001)
  alignmentSlider.style('width', str(sliderWidth) + 'px')
  alignmentSlider.position(firstSliderX + 2 * (sliderWidth + sliderSpacing), sliderY)

  separationSlider = createSlider(0, 5, 2.0, 0.0001)
  separationSlider.style('width', str(sliderWidth) + 'px')
  separationSlider.position(firstSliderX + 3 * (sliderWidth + sliderSpacing), sliderY)

  cohesionSlider = createSlider(0, 2, 1.71, 0.0001)
  cohesionSlider.style('width', str(sliderWidth) + 'px')
  cohesionSlider.position(firstSliderX + 4 * (sliderWidth + sliderSpacing), sliderY)

  radiusASlider = createSlider(0, 200, 120, 1)
  radiusASlider.style('width', str(sliderWidth) + 'px')
  radiusASlider.position(firstSliderX + 5 * (sliderWidth + sliderSpacing), sliderY)

  radiusSSlider = createSlider(0, 200, 90, 1)
  radiusSSlider.style('width', str(sliderWidth) + 'px')
  radiusSSlider.position(firstSliderX + 6 * (sliderWidth + sliderSpacing), sliderY)

  radiusCSlider = createSlider(0, 200, 150, 1)
  radiusCSlider.style('width', str(sliderWidth) + 'px')
  radiusCSlider.position(firstSliderX + 7 * (sliderWidth + sliderSpacing), sliderY)

  showRadiusCheckbox = createCheckbox('Display Radius', false)
  showRadiusCheckbox.position(firstSliderX + 8 * (sliderWidth + sliderSpacing), sliderY)
  showRadiusCheckbox.changed(showRadiusCheckboxEvent)


}

//Get constants values from UI and set them in the engine -------------------------------------------------------
function updateConstants()
{
  velocitySliderValue = velocitySlider.value()
  forceSliderValue = forceSlider.value()

  alignmentSliderValue = alignmentSlider.value()
  separationSliderValue = separationSlider.value()
  cohesionSliderValue = cohesionSlider.value()

  radiusASliderValue = radiusASlider.value()
  radiusSSliderValue = radiusSSlider.value()
  radiusCSliderValue = radiusCSlider.value()

  Agent.setConstants(velocitySliderValue, forceSliderValue, alignmentSliderValue, separationSliderValue, cohesionSliderValue, radiusASliderValue, radiusSSliderValue, radiusCSliderValue)
}

//Draw values from engine in UI ---------------------------------------------------------------------------------
function drawUI()
{
  fill(200)
  noStroke()
  text('Velocity: ' + velocitySliderValue, firstSliderX, windowHeight - 70)
  text('Force: ' + forceSliderValue, firstSliderX + sliderWidth + sliderSpacing, textY)
  text('Alignment: ' + alignmentSliderValue, firstSliderX + 2 * (sliderWidth + sliderSpacing), textY)
  text('Separation: ' + separationSliderValue, firstSliderX + 3 * (sliderWidth + sliderSpacing), textY)
  text('Cohesion: ' + cohesionSliderValue, firstSliderX + 4 * (sliderWidth + sliderSpacing), textY)
  text('Radius A: ' + radiusASliderValue, firstSliderX + 5 * (sliderWidth + sliderSpacing), textY)
  text('Radius S: ' + radiusSSliderValue, firstSliderX + 6 * (sliderWidth + sliderSpacing), textY)
  text('Radius C: ' + radiusCSliderValue, firstSliderX + 7 * (sliderWidth + sliderSpacing), textY)

}

//Handle checkbox events ----------------------------------------------------------------------------------------
function showRadiusCheckboxEvent()
{
  if (this.checked())
  {
    Agent.displayRadius(true)
  } else 
  {
    Agent.displayRadius(false)
  }
}

//Draw Repulsive Walls ------------------------------------------------------------------------------------------
function createWall()
{
  let spacing = 31
  let translate = -8

  let wallSize = 30
  let wallRadius = 100
  let wallForce = 25

  for (let x = 0; x < windowWidth; x += spacing)
  {
    wall.push(new Force(x, translate, wallSize, wallRadius, 'repel', wallForce))
    wall.push(new Force(x, canvasY - translate, wallSize, wallRadius, 'repel', wallForce))

  }

  for (let y = spacing; y < windowHeight - spacing; y += spacing)
  {
    wall.push(new Force(translate, y, wallSize, wallRadius, 'repel', wallForce))
    wall.push(new Force(canvasX - translate, y, wallSize, wallRadius, 'repel', wallForce))

  }
}