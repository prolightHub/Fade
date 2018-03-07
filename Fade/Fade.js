var canvas = document.getElementById("canvas");
var processing = new Processing(canvas, function(processing) {
    processing.size(400, 400);
    processing.background(0xFFF);

    var mouseIsPressed = false;
    processing.mousePressed = function () { mouseIsPressed = true; };
    processing.mouseReleased = function () { mouseIsPressed = false; };

    var keyIsPressed = false;
    processing.keyPressed = function () { keyIsPressed = true; };
    processing.keyReleased = function () { keyIsPressed = false; };

    function getImage(s) {
        var url = "https://www.kasandbox.org/programming-images/" + s + ".png";
        processing.externals.sketch.imageCache.add(url);
        return processing.loadImage(url);
    }

    function getLocalImage(url) {
        processing.externals.sketch.imageCache.add(url);
        return processing.loadImage(url);
    }

    // use degrees rather than radians in rotate function
    var rotateFn = processing.rotate;
    processing.rotate = function (angle) {
        rotateFn(processing.radians(angle));
    };

    with (processing) {
        var Fade = function(colorValue)
        {
            this.colorValue = colorValue;
            
            this.timer = 0;
            this.timerVel = 1;
            this.max = 100;
            this.fading = false;
            
            this.start = function(max, start)
            {
                this.max = max || this.max;
                this.timer = start || this.timer;
                this.fading = true;
            };
            this.full = function()
            {
                return (this.timer > this.max);
            };  
            this.draw = function()
            {
                if(this.fading)
                {
                    if(this.timer < 0 || this.timer > this.max)
                    {
                        this.timerVel = -this.timerVel;   
                    }
                    if(this.timer < 0)
                    {
                        this.fading = false;   
                    }
                    this.timer += this.timerVel;
                    
                    noStroke();
                    fill(red(this.colorValue), green(this.colorValue), blue(this.colorValue), this.timer * 255 / this.max);
                    rect(0, 0, width, height);
                }
            };
        };
        var fade = new Fade(color(0, 0, 0));
        fade.start(75, 0);
        var draw = function()
        {
            background(255, 255, 255);
            fade.draw();
        };
    }
    if (typeof draw !== 'undefined') processing.draw = draw;
});