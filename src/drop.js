import dropImage from '../src/images/drop.jpg';

class Drop {
    constructor(x, y, xVel, yVel, radius, c) {
        this.x = x;
        this.y = y;
        this.xVel = xVel;
        this.yVel = yVel;
        this.radius = radius;
        this.c = c;

        this.draw = () => {
            this.c.beginPath();
            this.c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            this.c.strokeStyle = 'blue';
            this.c.fillStyle = 'blue';
            this.c.stroke();
            this.c.fill();

            // let image = new Image();
            // image.src = '/src/images/drop.jpg';
            // this.c.drawImage(iconDrop,this.x, this.y)
        }

        this.update = () => {
            // this.x += this.xVel;
            this.y += this.yVel;
            this.draw();
        }
    }

}

export default Drop;