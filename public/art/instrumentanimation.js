// each sprite in sheet is 135x135
const spriteWidth = 135; 
const spriteHeight = 135;

// on sprite sheet column is orientation, row is animation frame
var animationSequence = {
    guitar: [],
    piano: [],
    drum: [],
    flute: [],
    banjo: []
}

var spriteSheet = {
    guitar: new Image(),
    piano: new Image(),
    drum: new Image(),
    flute: new Image(),
    banjo: new Image(),
}

// set spritesheet image
spriteSheet.guitar.src = '/sprites/gator_sprite_sheet.png';
spriteSheet.piano.src = '/sprites/cat_sprite_sheet.png';
spriteSheet.drum.src = '/sprites/duck_sprite_sheet.png';
spriteSheet.flute.src = '';
spriteSheet.banjo.src = '';

// sets up animaton sequence depending on instrument before starting animation
function startAnimation(instrument, direction, orientation){
    switch(instrument){
        case 'guitar':
            if (direction === 'up'){
                animationSequence.guitar = [1,0];
            }
            else if (direction === 'down'){
                animationSequence.guitar = [0,1];
            }
            animation(spriteSheet.guitar, animationSequence.guitar, orientation);
            break;
        case 'piano':
            animationSequence.piano = [0];
            break;
        case 'drum':
            if (direction === 'left'){
                animationSequence.drum = [0,1,0];
            }
            else if (direction === 'right'){
                animationSequence.drum = [0,2,0];
            }
            else if (direction === 'both'){
                animationSequence.drum = [0,3,0];
            }
            animation(spriteSheet.drum, animationSequence.drum, orientation);
            break;
        case 'flute':

            break;
        case 'banjo':

            break;
    }
}

function animation(image, sequence, orientation){
    // fps and frame counter
    let fps = 12;
    let frame = 0;

    let canvas = document.getElementById('instrumentCanvas'+orientation);
    let context = canvas.getContext('2d');

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
            context.clearRect(0, 0, canvas.width, canvas.height);
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

        window.requestAnimationFrame(animate);
    }
}