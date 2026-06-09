import http from "http";
import fs from "fs";
import { WebSocketServer } from "ws";
const PORT = 1250;

// USER INSTRUCTIONS
// 1. Run this server with `node server.js`
// 2. Open http://localhost:1250 in a browser tab to connect as a musician (you can open multiple tabs to be multiple musicians)
// 3. For OTHER machines, use http://<ben-machine-ip>:1250 to connect as a musician
//    -- If you want multiple machines to connect, ask me!
// 4. Open http://localhost:1250/campfire in another browser tab to connect as the campfire
// 5. Press the "Start campfire session" button in the campfire tab, then start playing notes in the musician tab(s)

const server = http.createServer((req, res) => {
  res.statusCode = 200;

  let filePath = "";

  // Based on the request URL, determine which of the 2 html files to serve (controller client or campfire)
  if (req.url === "/" || req.url === "/client" || req.url === "public/client") {
    filePath = "public/client.html";
  } else if (req.url === "/campfire" || req.url === "public/campfire") {
    filePath = "public/campfire.html";
  } else if (req.url === "/favicon.ico") {
    res.statusCode = 204;
    return res.end();
  } else {
    res.statusCode = 404;
    filePath = "public/404.html";
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.end("Error loading file");
    } else {
      res.setHeader("Content-Type", "text/html");
      res.end(data);
    }
  });
});

const wss = new WebSocketServer({ server });

let campfire = null;
const musicians = new Map();
let musicianIdCounter = 1;

function broadcastToCampfire(obj) {
  const data = JSON.stringify(obj);
  if (campfire) campfire.send(data);
}

wss.on("connection", (ws) => {
  console.log("New client connected");

  ws.on("message", (message) => {
    console.log(`Received: ${message}`);

    ws.id = musicianIdCounter++;

    let parsedMsg = JSON.parse(message);

    const address = parsedMsg.address;
    const args = parsedMsg.args;

    if (address === "/hello") {
      if (args[0] === "campfire") {
        campfire = ws;
        console.log("Campfire client connected");
      }
    }

    if (address === "/join") {
      musicians.set(ws.id, args[0]);
      console.log(`Musician ${ws.id} connected`);
    }

    if (address === "/note") {
      broadcastToCampfire({ address: "/note", args });
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
    if (musicians.has(ws.id)) {
      console.log(`Musician ${ws.id} leaving the campfire`);
      musicians.delete(ws.id);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Node server running at http://localhost:${PORT}/`);
});
