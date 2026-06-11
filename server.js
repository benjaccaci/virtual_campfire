import http from "http";
import fs from "fs";
import { WebSocketServer } from "ws";
const PORT = 1250;

// USER INSTRUCTIONS
// 1. Run this server with `node server.js` terminal command
// 2. Open http://localhost:1250 in a browser tab to connect as a musician (you can open multiple tabs to be multiple musicians)
// 3. For OTHER machines, use http://<server-machine-ip>:1250 to connect as a musician
//    -- If you want multiple machines to connect, you'll need to know your IP address (try the ifconfig | grep inet command)
// 4. Open http://localhost:1250/campfire in another browser tab to connect as the campfire
// 5. Press the "Start campfire session" button in the campfire tab, then start playing notes in the musician tab(s)

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  let filePath = "";

  // Based on the request URL, determine which of the 2 html files to serve (controller client or campfire)
  // Additionally, server the corresponding css file for the chosen html file
  if (req.url === "/" || req.url === "/client" || req.url === "public/client") {
    filePath = "public/client.html";
  } else if (req.url === "/campfire" || req.url === "public/campfire") {
    filePath = "public/campfire.html";
  } else if (req.url === "/client_styling.css") {
    filePath = "public/client_styling.css";
  } else if (req.url === "/campfire_styling.css") {
    filePath = "public/campfire_styling.css";
  } else if (req.url.endsWith(".ttf")) {
    filePath = "public" + req.url;
  } else if (req.url === "/favicon.ico") {
    res.statusCode = 204;
    return res.end();
  } else {
    res.statusCode = 404;
    filePath = "public/404.html";
  }

  // Open and read that file, then send it to the client
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.end("Error loading file");
    } else {
      if (filePath.endsWith(".ttf")) {
        res.setHeader("Content-Type", "font/ttf");
      } else if (filePath.endsWith(".css")) {
        res.setHeader("Content-Type", "text/css");
      } else {
        res.setHeader("Content-Type", "text/html");
      }
      res.end(data);
    }
  });
});

// Start the WS server
const wss = new WebSocketServer({ server });

let campfire = null;
const musicians = new Map();
let musicianIdCounter = 1;

function broadcastToCampfire(obj) {
  const data = JSON.stringify(obj);
  if (campfire) campfire.send(data);
}

wss.on("connection", (ws) => {
  ws.id = musicianIdCounter++;
  console.log("New client connected");

  ws.on("message", (message) => {
    console.log(`Received: ${message}`);

    let parsedMsg = JSON.parse(message);

    const address = parsedMsg.address;
    const args = parsedMsg.args;

    // Hello message sets up the connection between all clients (campfire and musician(s)) and server
    if (address === "/hello") {
      if (args[0] === "campfire") {
        campfire = ws;
        console.log("Campfire client connected");
      }
    }

    // Join message sets up the connection between musician and server, and adds them to the list of active musicians
    if (address === "/join") {
      musicians.set(ws.id, args[0]);
      console.log(`Musician ${ws.id} connected`);
    }

    // Note message represents a single note played by a musician
    if (address === "/note") {
      broadcastToCampfire({ address: "/note", args });
    }
  });

  // Close message disconnects the musician from the server, and removes them from the list of active musicians
  ws.on("close", () => {
    console.log("Client disconnected");
    if (musicians.has(ws.id)) {
      console.log(`Musician ${ws.id} leaving the campfire`);
      musicians.delete(ws.id);
    }
  });
});

// The server port is entirely arbitrary (1250 for ARTF 1250)
server.listen(PORT, () => {
  console.log(`Node server running at http://localhost:${PORT}/`);
});
