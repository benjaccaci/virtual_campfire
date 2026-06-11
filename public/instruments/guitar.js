const playBTN = document.getElementById("play-btn")

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

const guitarStringLowE = Object.create(guitarString);
const guitarStringA = Object.create(guitarString);
const guitarStringD = Object.create(guitarString);
const guitarStringG = Object.create(guitarString);
const guitarStringB = Object.create(guitarString);
const guitarStringHighE = Object.create(guitarString);

const guitar = [guitarStringLowE, guitarStringA, guitarStringD, guitarStringG, guitarStringB, guitarStringHighE];

chordCmaj = ['E2', 'C3', 'G3', 'C4', 'G4', 'E5'];
chordPresets = [chordCmaj];


function Pluck(note, string, strumDelay){
    guitar[string].triggerAttackRelease(note, 0.5, strumDelay)
}

function DownStrum(chordPreset, strumSpeed){
    for (let string = 0; string < guitar.length; string++){
        strumTiming = Tone.now()+((strumSpeed/1000)*string);
        chord = chordPresets[chordPreset];
        note = chord[string];
        Pluck(note, string, strumTiming);
    }
}

playBTN.addEventListener("click", async () => {
	if (Tone.Context.state !== "running"){
        Tone.start();
    }
    DownStrum(0, 10);
});
