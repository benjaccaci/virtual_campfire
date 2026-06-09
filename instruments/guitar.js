// button for testing
const playBTN = document.getElementById("play-btn")

// midi note for testing
let midiNote = 60;

class GuitarString{

    delay = new Tone.FeedbackDelay({
        delayTime: 1/(Tone.mtof(midiNote)),
        feedback: 0.9,
        wet: 1
    }).toDestination();

    noiseFilter = new Tone.Filter({
        frequency: 1600,
        type: "lowpass",
        rolloff: -24,
    }).connect(this.delay);

    // noiseEnvelope = new Tone.AmplitudeEnvelope({
    //     attack: 0.001,
    //     decay: 0.054,
    //     sustain: 0.0,
    //     release: 0.002
    // }).toDestination();

    exciter = new Tone.NoiseSynth({
        // envelope: this.noiseEnvelope,
        noise: "white",
    }).connect(this.noiseFilter);
}

const guitarString_1 = new GuitarString()

playBTN.addEventListener("click", async () => {
	if (Tone.Context.state !== "running"){
        Tone.start();
    }
    // guitar.toFrequency(midiNote, "midi");
    guitarString_1.exciter.triggerAttackRelease('8n');
});




