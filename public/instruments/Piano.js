const piano = new Tone.Sampler({
    urls: {
        'A3': "a3.ogg",
        'A#3': "as3.ogg",
        'B3': "b3.ogg",
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
        'A5': "a5.ogg",
        'A#5': "as5.ogg",
        'B5': "b5.ogg",
        'C5': "c5.ogg",
        'C#5': "cs5.ogg",
        'D5': "d5.ogg",
        'D#5': "ds5.ogg",
        'E5': "e5.ogg",
        'F5': "f5.ogg",
        'F#5': "fs5.ogg",
        'G5': "g5.ogg",
        'G#5': "gs5.ogg"
    },
    baseUrl: "/samples/piano/",
}).toDestination()

// const playBTN = document.getElementById("play-btn")
// playBTN.addEventListener("click", async () => {
// 	if (Tone.Context.state !== "running"){
//         Tone.start();
//     }
//     piano.triggerAttackRelease(["C3", "E3", "G3", "B4"], 0.5);
// });