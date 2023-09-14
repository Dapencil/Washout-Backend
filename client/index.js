const client = require("./client");

//const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  client.getAll(null, (err, data) => {
    if (!err) {
      res.json(data);
    }
  });
});

app.get("/:id", (req, res) => {
  client.get({ id: req.params.id }, (err, data) => {
    if (!err) {
      res.json(data);
    }
  });
});

app.post("/save", (req, res) => {
  let newBranchItem = {
    name: req.body.name,
    address: req.body.address,
    telNum: req.body.telNum,
  };

  client.insert(newBranchItem, (err, data) => {
    if (err) throw err;

    console.log("New Branch created successfully", data);
    res.sendStatus(200);
  });
});

app.post("/update", (req, res) => {
  const updateBranchItem = {
    id: req.body.id,
    name: req.body.name,
    address: req.body.address,
    telNum: req.body.telNum,
  };

  client.update(updateBranchItem, (err, data) => {
    if (err) throw err;

    console.log("Branch Item updated successfully", data);
    res.json(data);
  });
});

app.delete("/remove/:id", (req, res) => {
  client.remove({ id: req.params.id }, (err, _) => {
    if (err) throw err;
    console.log("Branch Item removed successfully");
    res.sendStatus(200);
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("Server running at port %d", PORT);
});
