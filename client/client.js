const PROTO_PATH_branch = "../proto/branch.proto";
const PROTO_PATH_machine = "../proto/machine.proto";

let grpc = require("@grpc/grpc-js");
let protoLoader = require("@grpc/proto-loader");

var packageDefinition_branch = protoLoader.loadSync(PROTO_PATH_branch, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true,
});

var packageDefinition_machine = protoLoader.loadSync(PROTO_PATH_machine, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true,
});

var branchService = grpc.loadPackageDefinition(
  packageDefinition_branch
).BranchService;
var machineService = grpc.loadPackageDefinition(
  packageDefinition_machine
).MachineService;

const client_branch = new branchService(
  "localhost:30043",
  grpc.credentials.createInsecure()
);

const client_machine = new machineService(
  "localhost:30043",
  grpc.credentials.createInsecure()
);

module.exports = {
  client_branch,
  client_machine,
};
