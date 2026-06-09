// button for testing
const playBTN = document.getElementById("play-btn")

// midi note for testing
let midiNote = 45;

// string pitch for testing
let stringPitch = 110;

class GuitarString{
    constructor(stringFundemental){
        this.stringFundemental = stringFundemental; 
    }
    
    fundementalFrequency = new Tone.LowpassCombFilter({
        delayTime: this.stringFundemental,
        resonance: 0.2,
        dampening: 12000
    }).toDestination();

    delay = new Tone.FeedbackDelay({
        delayTime: 1/(Tone.mtof(midiNote)),
        feedback: 0.93,
        wet: 1
    }).connect(this.fundementalFrequency);

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

    Pluck(note, strumDelay){
        this.delayTime = 1/Tone.mtof(note);
        this.exciter.triggerAttackRelease(0.1, Tone.now()+(strumDelay/1000));
    }
}

class Guitar{
    guitarStringLowE = new GuitarString(0.0121);
    guitarStringA = new GuitarString(0.0091)
    guitarStringD = new GuitarString(0.0068);
    guitarStringG = new GuitarString(0.0051);
    guitarStringB = new GuitarString(0.004);
    guitarStringHighE = new GuitarString(0.003);
    
    allStrings = [this.guitarStringLowE, this.guitarStringA, this.guitarStringD, 
        this.guitarStringD, this.guitarStringG, this.guitarStringB, this.guitarStringHighE]

    DownStrum(strumSpeed){
        for (let string = 0; string < this.allStrings.length; string++){
            this.allStrings[string].Pluck((45),(strumSpeed*string))
        }
    }
}

// const guitarString_1 = new GuitarString()
const guitar = new Guitar()

playBTN.addEventListener("click", async () => {
	if (Tone.Context.state !== "running"){
        Tone.start();
    }
    // guitar.toFrequency(midiNote, "midi");
    // guitarString_1.exciter.triggerAttackRelease('8n');
    // guitar.guitarStringB.exciter.triggerAttackRelease('8n');
    guitar.DownStrum(40);
});




