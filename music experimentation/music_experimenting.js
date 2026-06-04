const playBTN = document.getElementById("play-btn")
const osc = new Tone.Oscillator(440, "sine").toDestination();

//attach a click listener to a play button
playBTN.addEventListener("click", async () => {
	if (Tone.Context.state !== "running"){
        Tone.start();
    }
    osc.start();
});
