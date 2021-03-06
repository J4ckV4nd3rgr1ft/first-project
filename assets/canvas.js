var loadcount = 0;
var loadtotal = 0;
var preloaded = false;

function loadImages(imagefiles) {
    loadcount = 0;
    loadtotal = imagefiles.length;
    preloaded = false;

    var loadedimages = [];
    for (var i=0; i<imagefiles.length; i++) {
        var image = new Image();

        image.onload = function () {
            loadcount++;
            if (loadcount == loadtotal) {
                preloaded = true;
            }
        };

        image.src = imagefiles[i];
        loadedimages[i] = image;
    }

    return loadedimages;
}

function draw() {
    
    var circle = {'x': 10, 'y': 10, 'xVel': 2, 'yVel': 5, 'diameter': 35};

    var requestAnimationFrame =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        function(callback) {
            return setTimeout(callback, 1);
        };

    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        var images = loadImages(["redBall.png", "wood.jpg","green felt.jpg","goal net.jpg"]);
        var woodPattern;
        animate();
    } else {
        console.log("Canvas-unsupported code here");
    }

    function animate() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
        
        greenFelt = ctx.createPattern(images[2],"repeat")
        ctx.fillStyle = greenFelt;
        ctx.fillRect(0, 0, 1500, 1000);
        
        net = ctx.createPattern(images[3],"repeat")
        ctx.fillStyle = net;
        ctx.fillRect(0, 300, 100, 175);
        
        ctx.drawImage(images[0], circle.x, circle.y, circle.diameter, circle.diameter);
        circle.x += circle.xVel;

        circle.x += circle.xVel;
        
        if (circle.x > canvasWidth - circle.diameter|| circle.x < 0) {
            circle.xVel *= -1
        }

        if (circle.y > canvasWidth - circle.diameter|| circle.y < 0) {
            circle.yVel *= -1
        }
        requestAnimationFrame(animate);

       
    }
}
