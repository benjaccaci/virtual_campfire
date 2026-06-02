"use strict";

var { Server } = require("node-osc");
var { Tone } = require("tone");

// Create a server listening on port 3333, bound to all interfaces
var oscServer = new Server(3333, "0.0.0.0");


// Start a clock with the lowest possible latency
// Prototype v1 doesn't need a clock or synchronization

// Listen for incoming OSC messages
oscServer.on("message", function (msg, rinfo) {
  // msg is an array: [address, ...arguments]
  console.log(`Message: ${msg}\nReceived from: ${rinfo.address}:${rinfo.port}`);

  const osc = new Tone.Oscillator(msg[0], "sine").toDestination().start();

  const button = document.getElementById("play-button");

  document.querySelector("button")?.addEventListener("click", async () => {
    await Tone.start();
    console.log("audio is ready");
  });


  // Listen for any messages from any clients
  // For each message recieved:
  // Add the message to a queue of messages to be quantized
  // Quantize the message to the nearest # note
  // Once the message is quantized, add it to a queue of messages to be sent to the fireplace client

  // Close the server after receiving one message (for demo purposes)
  oscServer.close();
});
