class Force 
{
    constructor(x, y, size, radius, type, gravity)
    {
        this.color = ''
        this.size = size
        this.radius = radius
        this.position = createVector(x, y)
        this.type = type
        this.gravity = gravity

        this.action = ''

        if (this.type === 'attract')
        {
            this.color == 'grey'
            this.action = 'attract'
        }
        else if (this.type === 'repel')
        {
            this.color = 'red'
            this.action = 'repel'
        }


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

    act(other, action)
    {
        let desiredDirection
        let force

        if (this.action === 'repel')
        {
            desiredDirection = p5.Vector.sub(other.position, this.position)
            //desiredVelocity.normalize().mult(maxVelocity)

            force = p5.Vector.add(desiredDirection, this.velocity)

        }
        else if (this.action === 'attract')
        {
            desiredDirection = p5.Vector.sub(this.position, other.position)
            //desiredVelocity.normalize().mult(maxVelocity)
    
            force = p5.Vector.add(desiredDirection, this.velocity)

        }
        force.limit(this.gravity / (p5.Vector.mag(desiredDirection) ^ 2))

        other.applyForce(force)

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
        //this.drawRadius(0, 220, 0, 50, this.radius)

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