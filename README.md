# Boids
Implementation of  Boids Algorithm.

### Environment
A World with N Agents where every Agent shall move based on the following rules:

* Separation: steer to avoid crowding local flockmates
* Alignment: steer towards the average heading of local flockmates
* Cohesion: steer to move towards the average position (center of mass) of local flockmates

#### Initial Conditions
* World starts empty
* An Agent is placed on the environment every time there is a mouse click
  * Its position is initially mouse X and mouse Y
  * Its heading is initially a random number between 0 and 360 degrees
  * Its velocity is based on its heading and multiplied by a factor
