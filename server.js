const express = require("express");
const app = express();
const fs = require("fs");
const d = require("./data.json");

const PORT = process.env.PORT || 8080;

app.use(express.json());

app.get("/", (req, res) => {
  //   console.log(d);
  return res.status(200).send("Api is working fine");
});

// Greeting
app.get("/greeting", (req, res) => {
  return res.status(200).send("Hello world!");
});

// Register Employee
app.post("/employee", (req, res) => {
  //   const data = req.body;

  const temp = d;

  const Id = Math.floor(Math.random() * 10000).toString();

  const incoming_data = req.body;
  const e = {
    employeeId: Id,
    name: incoming_data.name,
    city: incoming_data.city,
  };

  temp.push(e);
  fs.writeFileSync("data.json", JSON.stringify(temp), "utf-8");
  console.log(temp);

  res.status(201).send({ employeeId: `${Id}` });
});

// Get Employee details
app.get("/employee/:id", (req, res) => {
  const id = req.params.id.slice(1);
  const readData = JSON.parse(fs.readFileSync("data.json", "utf-8"));
  const check = readData.filter((item, key) => {
    return item.employeeId == `${id}`;
    // console.log(item);
  });

  //   console.log(readData);
  //   console.log(id);
  return res.status(200).send(check);
});

// Get all Employee details
app.get("/employees/all", (req, res) => {
  //   console.log("all employee details");
  const readData = fs.readFileSync("data.json", "utf-8");
  //   console.log(readData);
  //   fs.writeFileSync("text.txt", "JSON.stringify(content) is here", "utf-8");
  return res.status(200).send(readData);
});

// Update Employee
app.put("/employee/:id", (req, res) => {
  return res.send();
});

// Delete Employee
app.delete("/employee/:id", (req, res) => {
  const id = req.params.id.slice(1);
  const readData = JSON.parse(fs.readFileSync("data.json", "utf-8"));
  const check = readData.filter((item, key) => {
    return item.employeeId !== `${id}`;
    // console.log(item);
  });
  console.log(check);

  fs.writeFile("data.json", JSON.stringify(check), (err) => {
    if (err) {
      console.log("Error found");
    } else {
      console.log("SuccesFully Deleted");
    }
  });

  //   console.log(readData);
  //   console.log(id);
  return res.status(200).send(check);
});

app.listen(PORT, () => {
  console.log("Server running at PORT", PORT);
});
