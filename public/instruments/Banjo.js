// const playBTN = document.getElementById("play-btn")

// create single banjo string and assign samples from /samples/banjo/ folder
const banjoString = new Tone.Sampler({
     urls: {
        'A3': "a3.ogg",
        'A#3': "as3.ogg",
        'C3': "c3.ogg",
        'C#3': "cs3.ogg",
        'D3': "d3.ogg",
        'D#3': "ds3.ogg",
        'E3': "e3.ogg",
        'F3': "f3.ogg",
        'F#3': "fs3.ogg",
        'G3': "g3.ogg",
        'G#3': "gs3.ogg",
        'A4': "a4.ogg",
        'A#4': "as4.ogg",
        'B4': "b4.ogg",
        'C4': "c4.ogg",
        'C#4': "cs4.ogg",
        'D4': "d4.ogg",
        'D#4': "ds4.ogg",
        'E4': "e4.ogg",
        'F4': "f4.ogg",
        'F#4': "fs4.ogg",
        'G4': "g4.ogg",
        'G#4': "gs4.ogg",
        'D5': "d5.ogg",
        'D#5': "ds5.ogg",
        'E5': "e5.ogg",
        'G5': "g5.ogg",
        'G#5': "gs5.ogg",
        'C6': "c6.ogg",
        'C#6': "cs6.ogg",
        'D6': "d6.ogg",
        'D#6': "ds6.ogg",
        'E6': "e6.ogg"
    },
    baseUrl: "/samples/banjo/",
}).toDestination()

// create new banjo string for each string on a banjo (we are doing a 5 string banjo tuned to open G) 
const banjoStringDrone = Object.create(banjoString); 
const banjoStringLowD = Object.create(banjoString);
const banjoStringG = Object.create(banjoString); 
const banjoStringB = Object.create(banjoString);
const banjoStringHighD = Object.create(banjoString); 

// array of all strings
const banjo = [banjoStringDrone, banjoStringLowD, banjoStringG, banjoStringB, banjoStringHighD];

// chord preset - notes in scientific notation listed from drone string -> high d string. 
// chord presets are based on open G banjo tuning
// strings that do not play in chord are null
chordCmaj = ['G4', 'C3', 'G3', 'C4', 'E4'];
chordPresets = [chordCmaj];

// individual string pluck using triggerAttackRelease
function Pluck(note, string, strumDelay){
    banjo[string].triggerAttackRelease(note, 1, strumDelay)
}

function Strum(chordPreset, strumSpeed, strumDirection){
    // set chord to play from preset list
    chord = chordPresets[chordPreset];

    // loop over each string and play note using pluck function from note in chord in same array position
    for (let string = 0; string < banjo.length; string++){
        if (strumDirection === 'down'){
            stringPlay = string;
        }
        // reverses play order from 0->5 to 5->0 to play from highest string to lowest string
        if (strumDirection === 'up'){
            stringPlay = banjo.length-string-1;
        }
        strumTiming = Tone.now()+((strumSpeed/1000)*string);
        note = chord[stringPlay];
        console.log(banjo[stringPlay]);
        if (note === null){
        }
        else {
         Pluck(note, stringPlay, strumTiming);
        }
    }
}

// playBTN.addEventListener("click", async () => {
// 	if (Tone.Context.state !== "running"){
//         Tone.start();
//     }
//     Strum(0, 10, 'down');
// });
