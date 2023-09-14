const PROTO_PATH_branch = "./proto/branch.proto";
const PROTO_PATH_machine = "./proto/machine.proto";

let grpc = require("@grpc/grpc-js");
let protoLoader = require("@grpc/proto-loader");
let branches = require("./branch_db");
let machines = require("./machine_db");

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

let branchProto = grpc.loadPackageDefinition(packageDefinition_branch);
let machineProto = grpc.loadPackageDefinition(packageDefinition_machine);

const server = new grpc.Server();

//branchService
server.addService(branchProto.BranchService.service, {
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

//machineService
server.addService(machineProto.MachineService.service, {
  getAll: (_, callback) => {
    callback(null, { machines });
  },
  get: (call, callback) => {
    let MachineItem = machines.find((n) => n.id == call.request.id);

    if (MachineItem) {
      callback(null, MachineItem);
    } else {
      callback({
        code: grpc.status.NOT_FOUND,
        details: "Not found",
      });
    }
  },
  insert: (call, callback) => {
    let machineItem = call.request;
    machineItem.id = "some-id";
    machines.push(machineItem);
    callback(null, machineItem);
  },
  update: (call, callback) => {
    let existingMachineItem = machines.find((n) => n.Id == call.request.id);

    if (existingMachineItem) {
      existingMachineItem.branchId = call.request.branchId;
      existingMachineItem.status = call.request.status;
      existingMachineItem.type = call.request.type;
      callback(null, existingMachineItem);
    } else {
      callback({
        code: grpc.status.NOT_FOUND,
        details: "Not found",
      });
    }
  },
  remove: (call, callback) => {
    let existingMachineItem = machines.findIndex(
      (n) => n.id == call.request.id
    );

    if (existingMachineItem != -1) {
      machines.splice(existingMachineItem, 1);
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
