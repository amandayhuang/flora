class Cloud {
    constructor(x, y, xVel, yVel, c) {
        this.x = x;
        this.y = y;
        this.xVel = xVel;
        this.yVel = yVel;
        this.c = c;

        this.draw = () => {
            let image = new Image();
            image.src = '../src/images/cloud.png';
            this.c.drawImage(image, this.x, this.y, 220, 127);
        }

        this.update = () => {
            if(this.x > this.c.canvas.width || this.x < 0){
                this.xVel = -this.xVel;
            }
            if (this.y > this.c.canvas.height || this.y < 0) {
                this.yVel = -this.yVel;
            }
            this.x += this.xVel;
            this.y += this.yVel;
            this.draw();
        }
    }

}

export default Cloud;