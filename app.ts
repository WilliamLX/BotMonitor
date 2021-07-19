// var udp = require("datagram-stream");
// var dgram = require("dgram");
import * as dgram from "dgram";

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
