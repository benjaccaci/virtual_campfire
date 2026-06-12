// const playBTN = document.getElementById("play-btn")

// create single guitar string and assign samples from /samples/guitar/ folder
const guitarString = new Tone.Sampler({
     urls: {
        'A2': "a2.ogg",
        'A#2': "as2.ogg",
        'B2': "b2.ogg",
        'E2': "e2.ogg",
        'F2': "f2.ogg",
        'F#2': "fs2.ogg",
        'G2': "g2.ogg",
        'G#2': "gs2.ogg",
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
    },
    baseUrl: "/samples/guitar/",
}).toDestination()

// create new guitar string for each string on a guitar
const guitarStringLowE = Object.create(guitarString);
const guitarStringA = Object.create(guitarString);
const guitarStringD = Object.create(guitarString);
const guitarStringG = Object.create(guitarString);
const guitarStringB = Object.create(guitarString);
const guitarStringHighE = Object.create(guitarString);

// array of all strings
const guitar = [guitarStringLowE, guitarStringA, guitarStringD, guitarStringG, guitarStringB, guitarStringHighE];

// chord preset - notes in scientific notation listed from lowest string -> highest string. EADGBE
// strings that do not play in chord are null
const gtrChordCmaj = [null, 'C3', 'E3', 'G3', 'C4', 'E5'];
const gtrChordDm = [null, null, 'D3','A3','D4','F4'];
const gtrChordEm = ['E2', 'B2','E3','G3','B3','E4'];
const gtrChordFmaj = ['F2','C3','F3','A3','C4','F4'];
const gtrChordGmaj = ['G2','B2','D3','G3','B3','G4'];
const gtrChordAm = [null,'A2','E3','A3','C4','E4'];
gtrChordPresets = [gtrChordCmaj,gtrChordDm,gtrChordEm,gtrChordFmaj,gtrChordGmaj,gtrChordAm];

// individual string Gtr_Pluck using triggerAttackRelease
function Gtr_Pluck(note, string, strumDelay){
    guitar[string].triggerAttackRelease(note, 1, strumDelay)
}

// strum function
// strumSpeed is time between each string playing to create strum effect (in ms)
function GtrStrum(chordPreset, strumSpeed, strumDirection){
    // set chord to play from preset list
    chord = gtrChordPresets[chordPreset];

    // loop over each string and play note using Gtr_Pluck function from note in chord in same array position
    for (let string = 0; string < guitar.length; string++){
        if (strumDirection === 'down'){
            stringPlay = string;
        }
        // reverses play order from 0->5 to 5->0 to play from highest string to lowest string
        if (strumDirection === 'up'){
            stringPlay = guitar.length-string-1;
        }
        strumTiming = Tone.now()+((strumSpeed/1000)*string);
        note = chord[stringPlay];
        if (note === null){
        }
        else {
         Gtr_Pluck(note, stringPlay, strumTiming);
        }
    }
}

// playBTN.addEventListener("click", async () => {
// 	if (Tone.Context.state !== "running"){
//         Tone.start();
//     }
//     GtrStrum(0, 20, 'down');
// });
