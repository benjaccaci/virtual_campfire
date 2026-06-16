var drumCanvas =  document.getElementById("topright");
var drumContext = drumCanvas.getContext('2d');

// each sprite in sheet is 135x135 images
// const spriteWidth = 135; 
// const spriteHeight = 135;

// on sprite sheet column is orientation, row is animation frame
let drumAnimationSequence = [];

// set drum spritesheet image
let drumSpriteSheet = new Image();
drumSpriteSheet.src = '/sprites/duck_sprite_sheet.png';

drumSpriteSheet.onload = function() {
    drumAnimation(1, 'right')
};

function drumAnimation(orientation, direction){
    if (direction === 'left'){
        drumAnimationSequence = [0,1,0];
    }
    else if (direction === 'right'){
        drumAnimationSequence = [0,2,0];
    }
    else if (direction === 'both'){
        drumAnimationSequence = [0,3,0];
    }
    drumanimation(drumSpriteSheet, orientation, drumAnimationSequence);
}

// same animation function as in guitar
function drumaAimation (image, orientation, sequence){
    // fps and frame counter
    let fps = 12;
    let frame = 0;

    // rAF returns a timestamp - console.log is arbitrary to set timestamp to start with
    let lastframe = window.requestAnimationFrame(console.log);
    
    // start animation
    animate(lastframe)

    // looping function using rAF
    function animate(timestamp){
        // end animation when no more frames
        if ((frame+1) > sequence.length){
            return;
        }
        // only draw image if enough time between frames has passed
        frameDelta = timestamp-lastframe;
        if (frameDelta > 1000/fps){
            lastframe = timestamp;
            drumContext.clearRect(0, 0, drumCanvas.width, drumCanvas.height);
            drumContext.drawImage(
                image, // image
                spriteWidth*orientation, // sx - character orientation, 45 degree steps
                spriteHeight*sequence[frame], // sy - character start frame, up or down
                spriteWidth, // sWidth
                spriteHeight, // sHeight
                0, // dx
                0, // dy
                spriteWidth, // dWidth
                spriteHeight,  // dHeight
            );
            // iterate frame counter
            frame++;
        }

        window.requestAnimationFrame(animate);
    }
}
