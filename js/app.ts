// var udp = require("datagram-stream");
// var dgram = require("dgram");
import * as dgram from "dgram";

let PORT = 60000;
let HOST = "192.168.50.206";

const server = dgram.createSocket("udp4");

server.on("error", (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on("message", (msg, rinfo) => {
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});

server.on("listening", () => {
  const address = server.address();
  address.address = "192.168.50.206";
  address.port = 60000;
  console.log(address);
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(41234);
// Prints: server listening 0.0.0.0:41234

console.log("send hello");
let message = Buffer.from("hello");
server.send(message, 0, message.length, PORT, HOST, function (err, bytes) {
  if (err) throw err;
  console.log("UDP message sent to " + HOST + ":" + PORT);
  // server.close();
});

console.log("message event");
server.on("message", (msg, rinfo) => {
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});
