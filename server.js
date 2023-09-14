const PROTO_PATH = "./proto/washout.proto";

let grpc = require("@grpc/grpc-js");
let protoLoader = require("@grpc/proto-loader");
let branches = require("./mock");

var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true,
});

let washoutProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

server.addService(washoutProto.BranchService.service, {
  getAllBranch: (_, callback) => {
    callback(null, { branches });
  },
});

server.bindAsync(
  "127.0.0.1:30043",
  grpc.ServerCredentials.createInsecure(),
  () => {
    server.start();
  }
);
