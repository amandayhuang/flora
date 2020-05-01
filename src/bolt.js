class Bolt {
    constructor(x, y, xVel, yVel, c) {
        this.x = x;
        this.y = y;
        this.xVel = xVel;
        this.yVel = yVel;
        this.c = c;

        this.draw = () => {
            let image = new Image();
            image.src = 'src/images/bolt.png';
            this.c.drawImage(image, this.x, this.y, 80, 200);
        }

        this.update = () => {
            this.x += this.xVel;
            this.y += this.yVel;
            this.draw();
        }
    }

}

export default Bolt;