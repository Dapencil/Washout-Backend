const PROTO_PATH = "../proto/washout.proto";

let grpc = require("@grpc/grpc-js");
let protoLoader = require("@grpc/proto-loader");

var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true,
});

var branchService = grpc.loadPackageDefinition(packageDefinition).BranchService;

const client = new branchService(
  "localhost:30043",
  grpc.credentials.createInsecure()
);

module.exports = client;
