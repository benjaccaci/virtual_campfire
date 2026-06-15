var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

// each sprite in sheet is 135x135 images
const spriteWidth = 135; 
const spriteHeight = 135;

// set image
let gtrSpriteSheet = new Image();
gtrSpriteSheet.src = '/sprites/gator_sprite_sheet.png';
// gtrSpriteSheet.onload = function() {
//     gtrAnimation(0, 'down')
// };

function gtrAnimation (orientation, direction){
    if (direction === 'up'){
        handAnimation = [1,0] 
    }
    else if (direction === 'down'){
        handAnimation = [0,1]
    }
    let fps = 12;
    let frame = 0;
    let lastframe = window.requestAnimationFrame(console.log);
    animate(lastframe)

    function animate(timestamp){
        frameDelta = timestamp-lastframe;

        if (frameDelta > 1000/fps){
            lastframe = timestamp;
            context.drawImage(
                gtrSpriteSheet, // image
                spriteWidth*orientation, // sx - character orientation, 45 degree steps
                spriteHeight*handAnimation[frame], // sy - character start frame, up or down
                spriteWidth, // sWidth
                spriteHeight, // sHeight
                0, // dx
                0, // dy
                spriteWidth, // dWidth
                spriteHeight,  // dHeight
            );
            frame++;
        }

        if (frame > handAnimation.length){
            return;
        }
        window.requestAnimationFrame(animate);
    }
}

