let globalGravity = 15

let numberOfAgents = 5
let numberOfObstacles = 1
let numberOfGoals = 1

let agents = []
let obstacles = []
let goals = []
let wall = []

let tool = 'agent'

let canvasX
let canvasY

// UI Settings---------------------------------------------------------------------------------------------------
// Slider Objects
let velocitySlider

let attractionForceSlider
let attractionRadiusSlider

let repulsionForceSlider
let repulsionRadiusSlider

let showRadiusCheckbox

// Slider Values
let velocitySliderValue = 0

let attractionForceSliderValue = 0
let attractionRadiusSliderValue = 0

let repulsionForceSliderValue = 0
let repulsionRadiusSliderValue = 0

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

  createWall()
}

// Draw Function ------------------------------------------------------------------------------------------------
function draw()
{
  updateConstants()

  background(50, 50, 50)

  drawUI()

  //Update and Draw
  for (let i = 0; i < obstacles.length; i++)
  {
    obstacles[i].show()
  }

  //Update and Draw
  for (let i = 0; i < wall.length; i++)
  {
    wall[i].show()
  }

  //Update and Draw
  for (let i = 0; i < goals.length; i++)
  {
    goals[i].show()
  }

  //Check Interactions
  for (let i = 0; i < agents.length; i++)
  {


    //agents[i].attract(createVector(mouseX,mouseY))
    agents[i].allign(agents)
    agents[i].gather(agents)
    agents[i].update()
    agents[i].show()

    //Between Agents and Agents
    for (let j = 0; j < agents.length; j++)
    {
      if (i != j && agents[i].insideRepulsionRadius(agents[j]))
      {
        agents[i].avoid(agents[j])
      }
      if (i != j && agents[i].insideAttractionRadius(agents[j]))
      {
        //agents[i].allign(agents)
       // agents[i].gather(agents)
      }
    }

    //Between Agents and Obstacles
    for (let j = 0; j < obstacles.length; j++)
    {
      if (obstacles[j].insideOrbit(agents[i]))
      {
        obstacles[j].act(agents[i])
      }
    }

    //Between Agents and Walls
    for (let j = 0; j < wall.length; j++)
    {
      if (wall[j].insideOrbit(agents[i]))
      {
        wall[j].act(agents[i])
      }
    }

    //Between Agents and Goals
    for (let j = 0; j < goals.length; j++)
    {
      if (goals[j].insideOrbit(agents[i]))
      {
        goals[j].act(agents[i])

        let dist = p5.Vector.dist(agents[i].position, goals[j].position)
        if ((dist > 0) && (dist <= 5))
        {
          agents.splice(i, 1)
          break
        }
      }
    }

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
          //agents.push(new Agent(random(0, windowWidth), random(0, windowHeight)))
          agents.push(new Agent(mouseX, mouseY))
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

  velocitySlider = createSlider(0, 50, 5, 0.05)
  velocitySlider.style('width', str(sliderWidth) + 'px')
  velocitySlider.position(firstSliderX, sliderY)

  attractionForceSlider = createSlider(0, 5, 0.05, 0.01)
  attractionForceSlider.style('width', str(sliderWidth) + 'px')
  attractionForceSlider.position(firstSliderX + sliderWidth + sliderSpacing, sliderY)

  attractionRadiusSlider = createSlider(0, 350, 115, 2)
  attractionRadiusSlider.style('width', str(sliderWidth) + 'px')
  attractionRadiusSlider.position(firstSliderX + 2 * (sliderWidth + sliderSpacing), sliderY)

  repulsionForceSlider = createSlider(0, 5, 0.45, 0.01)
  repulsionForceSlider.style('width', str(sliderWidth) + 'px')
  repulsionForceSlider.position(firstSliderX + 3 * (sliderWidth + sliderSpacing), sliderY)

  repulsionRadiusSlider = createSlider(0, 250, 60, 2)
  repulsionRadiusSlider.style('width', str(sliderWidth) + 'px')
  repulsionRadiusSlider.position(firstSliderX + 4 * (sliderWidth + sliderSpacing), sliderY)

  showRadiusCheckbox = createCheckbox('Display Radius', false)
  showRadiusCheckbox.position(firstSliderX + 5 * (sliderWidth + sliderSpacing), sliderY)
  showRadiusCheckbox.changed(showRadiusCheckboxEvent)


}

//Get constants values from UI and set them in the engine -------------------------------------------------------
function updateConstants()
{
  velocitySliderValue = velocitySlider.value()

  attractionForceSliderValue = attractionForceSlider.value()
  attractionRadiusSliderValue = attractionRadiusSlider.value()

  repulsionForceSliderValue = repulsionForceSlider.value()
  repulsionRadiusSliderValue = repulsionRadiusSlider.value()

  Agent.setConstants(velocitySliderValue, attractionForceSliderValue, attractionRadiusSliderValue, repulsionForceSliderValue, repulsionRadiusSliderValue)
}

//Draw values from engine in UI ---------------------------------------------------------------------------------
function drawUI()
{
  fill(200)
  noStroke()
  text('Velocity: ' + velocitySliderValue, firstSliderX, windowHeight - 70)
  text('Attraction Force: ' + attractionForceSliderValue, firstSliderX + sliderWidth + sliderSpacing, textY)
  text('Attraction Radius: ' + attractionRadiusSliderValue, firstSliderX + 2 * (sliderWidth + sliderSpacing), textY)
  text('Repulsion Force: ' + repulsionForceSliderValue, firstSliderX + 3 * (sliderWidth + sliderSpacing), textY)
  text('Repulsion Radius: ' + repulsionRadiusSliderValue, firstSliderX + 4 * (sliderWidth + sliderSpacing), textY)

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
  let wallForce = 15

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