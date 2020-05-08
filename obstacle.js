let g = 15

class Obstacle 
{
    constructor(x, y)
    {
        this.size = 30
        this.radius = 100
        this.position = createVector(x, y)
        this.color = 'red'

    }

    insideOrbit(other)
    {
        
        let distance = p5.Vector.dist(this.position, other.position)
        
        if ((distance > 0) && (distance <= this.radius))
        {
            //this.drawArrow(this.position, p5.Vector.sub(other.position, this.position), 'white')
            return true
        } else
            return false

    }

    repulse(other)
    {
        let desiredVelocity = p5.Vector.sub(other.position, this.position)
        //desiredVelocity.normalize().mult(maxVelocity)

        let steer = p5.Vector.add(desiredVelocity, this.velocity)
        steer.limit(g / (p5.Vector.mag(desiredVelocity) ^ 2))

        other.applyForce(steer)

        //this.drawArrow(this.position, steer.mult(500), 'white')
    }

    
    attract(other)
    {
        let desiredVelocity = p5.Vector.sub(this.position, other.position)
        //desiredVelocity.normalize().mult(maxVelocity)

        let steer = p5.Vector.add(desiredVelocity, this.velocity)
        steer.limit(g / (p5.Vector.mag(desiredVelocity) ^ 2))

        other.applyForce(steer)

        //this.drawArrow(this.position, steer.mult(500), 'white')
    }

    show()
    {
        push()
        stroke(0)
        fill(this.color)
        translate(this.position.x, this.position.y)
        rectMode(CENTER)
        ellipse(0, 0, this.size);
        pop()
        this.drawRadius(0, 220, 0, 50, this.radius)

    }

    drawRadius(r, g, b, o, rad)
    {
        push()
        stroke(r, g, b, o)
        noFill()
        translate(this.position.x, this.position.y)
        circle(0, 0, rad * 2)
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

}