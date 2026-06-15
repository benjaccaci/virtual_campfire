var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

// each sprite in sheet is 135x135 images
const spriteWidth = 135; 
const spriteHeight = 135;

// on sprite sheet column is orientation, row is animation frame
let gtrAnimationSequence = [];


// set guitar spritesheet image
let gtrSpriteSheet = new Image();
gtrSpriteSheet.src = '/sprites/gator_sprite_sheet.png';
gtrSpriteSheet.onload = function() {
    gtrAnimation(0, 'down')
};

// set guitar spritesheet row sequence and start animation
function gtrAnimation(orientation, direction){
    if (direction === 'up'){
        gtrAnimationSequence = [1,0];
    }
    else if (direction === 'down'){
        gtrAnimationSequence = [0,1];
    }
    animation(gtrSpriteSheet, orientation, gtrAnimationSequence);
}

function animation (image, orientation, sequence){
    // fps and frame counter
    let fps = 12;
    let frame = 0;

    // rAF returns a timestamp - console.log is arbitrary to set timestamp to start with
    let lastframe = window.requestAnimationFrame(console.log);
    
    // start animation
    animate(lastframe)

    // looping function using rAF
    function animate(timestamp){
        // only draw image if enough time between frames has passed
        frameDelta = timestamp-lastframe;
        if (frameDelta > 1000/fps){
            lastframe = timestamp;
            context.drawImage(
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
        // end animation when no more frames
        if (frame > sequence.length){
            return;
        }
        window.requestAnimationFrame(animate);
    }
}