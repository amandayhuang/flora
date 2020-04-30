class Sun {
    constructor(x, y, xVel, yVel, c) {
        this.x = x;
        this.y = y;
        this.xVel = xVel;
        this.yVel = yVel;
        this.c = c;

        this.draw = () => {
            let image = new Image();
            image.src = '/src/images/sun.png';
            this.c.drawImage(image, this.x, this.y)
        }

        this.update = () => {
            if(this.x >=0 ){
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

export default Sun;