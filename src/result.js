class Result {
    constructor(x, y, xVel, yVel, c, imgLink) {
        this.x = x;
        this.y = y;
        this.xVel = xVel;
        this.yVel = yVel;
        this.c = c;

        this.draw = () => {
            let image = new Image();
            image.src = imgLink;
            this.c.drawImage(image, this.x, this.y,200,200)
        }

        this.update = () => {
            if (this.x >= 0) {
                this.xVel = -this.xVel;
            }
            if (this.y >= 0) {
                this.yVel = -this.yVel;
            }
            this.x += this.xVel;
            this.y += this.yVel;
            this.draw();
        }
    }

}

export default Result;