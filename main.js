let globalGravity = 15

let numberOfAgents = 10
let numberOfObstacles = 1

let agents = []
let obstacles = []
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

let sliderWidth = 200
let sliderSpacing = 40
let firstSliderX = 20
let sliderY
let textY
// --------------------------------------------------------------------------------------------------------------


// Setup Function -----------------------------------------------------------------------------------------------
function setup()
{
  canvasX = windowWidth
  canvasY = windowHeight - 4

  createCanvas(canvasX, canvasY)

  sliderY = windowHeight - 60
  textY = sliderY - 10

  setupUI()
  createWall()
}

// Draw Function ------------------------------------------------------------------------------------------------
function draw()
{
  updateConstants()

  background(50, 50, 50)

  drawUI()

  for (let i = 0; i < agents.length; i++)
  {
    //agents[i].attract(createVector(mouseX,mouseY))
    agents[i].update()
    agents[i].show()

    for (let j = 0; j < agents.length; j++)
    {
      if (i != j && agents[i].checkRepulsionDistance(agents[j]))
      {
        agents[i].avoid(agents[j])
      }
      if (i != j && agents[i].checkAttractionDistance(agents[j]))
      {
        //agents[i].align(agents)
        //agents[i].gather(agents)

      }

    }


    for (let j = 0; j < obstacles.length; j++)
    {
      if (obstacles[j].insideOrbit(agents[i]))
      {
        obstacles[j].repulse(agents[i])
      }
    }

    for (let j = 0; j < wall.length; j++)
    {
      if (wall[j].insideOrbit(agents[i]))
      {
        wall[j].repulse(agents[i])
      }
    }


  }

  for (let i = 0; i < obstacles.length; i++)
  {
    obstacles[i].show()
  }

  for (let i = 0; i < wall.length; i++)
  {
    wall[i].show()
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
          agents.push(new Agent(random(0, windowWidth), random(0, windowHeight)))
          //agents.push(new Agent(mouseX, mouseY))
        }
        break

      case 'obstacle':
        for (let i = 0; i < numberOfObstacles; i++)
        {
          obstacles.push(new Obstacle(mouseX, mouseY))
          //obstacles.push(new Obstacle(random(0, windowWidth), random(0, windowHeight)))
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
  } else if (key == 'o')
  {
    tool = 'obstacle'
  }
}

// Configure the position and apeareance of UI Elements ---------------------------------------------------------
function setupUI()
{
  textSize(20)

  velocitySlider = createSlider(0, 50, 3.5, 0.05)
  velocitySlider.style('width', str(sliderWidth) + 'px')
  velocitySlider.position(firstSliderX, sliderY)

  attractionForceSlider = createSlider(0, 5, 0.09, 0.01)
  attractionForceSlider.style('width', str(sliderWidth) + 'px')
  attractionForceSlider.position(firstSliderX + sliderWidth + sliderSpacing, sliderY)

  attractionRadiusSlider = createSlider(0, 350, 150, 2)
  attractionRadiusSlider.style('width', str(sliderWidth) + 'px')
  attractionRadiusSlider.position(firstSliderX + 2 * (sliderWidth + sliderSpacing), sliderY)

  repulsionForceSlider = createSlider(0, 5, 0.38, 0.01)
  repulsionForceSlider.style('width', str(sliderWidth) + 'px')
  repulsionForceSlider.position(firstSliderX + 3 * (sliderWidth + sliderSpacing), sliderY)

  repulsionRadiusSlider = createSlider(0, 250, 56, 2)
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

  for (let x = 0; x < windowWidth; x += spacing)
  {
    wall.push(new Obstacle(x, translate))
    wall.push(new Obstacle(x, canvasY - translate))

  }

  for (let y = spacing; y < windowHeight - spacing; y += spacing)
  {
    wall.push(new Obstacle(translate, y))
    wall.push(new Obstacle(canvasX - translate, y))

  }
}