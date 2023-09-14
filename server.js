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
  getAll: (_, callback) => {
    callback(null, { branches });
  },
  get: (call, callback) => {
    let branchItem = branches.find((n) => n.id == call.request.id);

    if (branchItem) {
      callback(null, branchItem);
    } else {
      callback({
        code: grpc.status.NOT_FOUND,
        details: "Not found",
      });
    }
  },
  insert: (call, callback) => {
    let branchItem = call.request;
    console.log(branchItem);
    branchItem.id = "some-id";
    branches.push(branchItem);
    callback(null, branchItem);
  },
  update: (call, callback) => {
    let existingBranchItem = branches.find((n) => n.Id == call.request.id);

    if (existingBranchItem) {
      existingBranchItem.name = call.request.name;
      existingBranchItem.address = call.request.address;
      existingBranchItem.telNum = call.request.telNum;
      callback(null, existingBranchItem);
    } else {
      callback({
        code: grpc.status.NOT_FOUND,
        details: "Not found",
      });
    }
  },
  remove: (call, callback) => {
    let existingBranchItem = branches.findIndex((n) => n.id == call.request.id);

    if (existingBranchItem != -1) {
      branches.splice(existingBranchItem, 1);
      callback(null, {});
    } else {
      callback({
        code: grpc.status.NOT_FOUND,
        details: "NOT Found",
      });
    }
  },
});

server.bindAsync(
  "127.0.0.1:30043",
  grpc.ServerCredentials.createInsecure(),
  () => {
    server.start();
  }
);
