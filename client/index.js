const client = require("./client");

//const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "hbs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  client.getAllBranch(null, (err, data) => {
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
    // res.json(data);
    res.redirect("/");
  });
});

app.post("/update", (req, res) => {
  const updateBranchItem = {
    id: req.body.id,
    name: req.body.name,
    address: req.body.address,
    telNum: req.body.telNum,
  };
  console.log(
    "update Item %s %s %d",
    updateBranchItem.id,
    req.body.name,
    req.body.address,
    req.body.telNum
  );

  client.update(updateBranchItem, (err, data) => {
    if (err) throw err;

    console.log("Branch Item updated successfully", data);
    res.json(data);
    res.redirect("/");
  });
});

app.post("/remove", (req, res) => {
  client.remove({ id: req.body.id }, (err, _) => {
    if (err) throw err;
    console.log("Branch Item removed successfully");
    res.redirect("/");
  });
});

const PORT = process.env.PORT || 3000;
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("Something broke!");
// });

app.listen(PORT, () => {
  console.log("Server running at port %d", PORT);
});
