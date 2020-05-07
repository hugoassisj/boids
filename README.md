[![HitCount](http://hits.dwyl.com/hugoassisj/boids.svg)](http://hits.dwyl.com/hugoassisj/boids)

# Boids
Implementation of  Boids Algorithm.

### Environment
A World with N Agents where every Agent shall move based on the following rules:

* Separation: steer to avoid crowding local flockmates                                      (Not Implemented)
* Alignment: steer towards the average heading of local flockmates                          (Not Implemented)
* Cohesion: steer to move towards the average position (center of mass) of local flockmates (Not Implemented)
* Seek: steer towards an specific point
* Avoid: steer away of each other based on a field of view

It is possible to change the velocity, attraction force (seek) , repulsion force (avoid) and radius (avoid) in execution time.

----

#### Initial Conditions
* World starts empty
* An Agent is placed on the environment every time there is a mouse click
  * Its position is initially mouse X and mouse Y
  * Its heading is initially a random number between 0 and 360 degrees
  * Its velocity is based on its heading and multiplied by a factor
* Every Agent steer towards an specific point in the middle of the screen
* Every Agent avoid each other
