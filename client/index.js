const { client_branch, client_machine } = require("./client");

//const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Branch Service
app.get("/branch/", (req, res) => {
  client_branch.getAll(null, (err, data) => {
    if (!err) {
      res.json(data);
    }
  });
});

app.get("/branch/:id", (req, res) => {
  client_branch.get({ id: req.params.id }, (err, data) => {
    if (!err) {
      res.json(data);
    }
  });
});

app.post("/branch/save", (req, res) => {
  let newBranchItem = {
    name: req.body.name,
    address: req.body.address,
    telNum: req.body.telNum,
  };

  client_branch.insert(newBranchItem, (err, data) => {
    if (err) throw err;

    console.log("New Branch created successfully", data);
    res.sendStatus(200);
  });
});

app.post("/branch/update", (req, res) => {
  const updateBranchItem = {
    id: req.body.id,
    name: req.body.name,
    address: req.body.address,
    telNum: req.body.telNum,
  };

  client_branch.update(updateBranchItem, (err, data) => {
    if (err) throw err;

    console.log("Branch Item updated successfully", data);
    res.json(data);
  });
});

app.delete("/branch/remove/:id", (req, res) => {
  client_branch.remove({ id: req.params.id }, (err, _) => {
    if (err) throw err;
    console.log("Branch Item removed successfully");
    res.sendStatus(200);
  });
});

//Machine Service
app.get("/machine", (req, res) => {
  client_machine.getAll(null, (err, data) => {
    if (!err) {
      res.json(data);
    }
  });
});

app.get("/machine/:id", (req, res) => {
  client_machine.get({ id: req.params.id }, (err, data) => {
    if (!err) {
      res.json(data);
    }
  });
});

app.post("/machine/save", (req, res) => {
  let newMachineItem = {
    branchId: req.body.branchId,
    status: req.body.status,
    type: req.body.type,
  };

  client_machine.insert(newMachineItem, (err, data) => {
    if (err) throw err;

    console.log("New Machine created successfully", data);
    res.sendStatus(200);
  });
});

app.post("/machine/update", (req, res) => {
  const updateMachineItem = {
    id: req.body.id,
    branchId: req.body.branchId,
    status: req.body.status,
    type: req.body.type,
  };

  client_machine.update(updateMachineItem, (err, data) => {
    if (err) throw err;

    console.log("Machine Item updated successfully", data);
    res.json(data);
  });
});

app.delete("/machine/remove/:id", (req, res) => {
  client_machine.remove({ id: req.params.id }, (err, _) => {
    if (err) throw err;
    console.log("Machine Item removed successfully");
    res.sendStatus(200);
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("Server running at port %d", PORT);
});
