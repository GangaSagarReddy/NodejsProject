const express = require("express");

const cors = require("cors");

const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();
multer = require("multer");
const path = require("path");

app.use(cors());
app.use(express.static("./public"));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "employee_management_system",
});

app.post("/reguser", async (req, res) => {
  const sql = "INSERT INTO reg_user (`name`,`email`,`password`) VALUES (?)";

  const values = [req.body.name, req.body.email, req.body.password];

  db.query(sql, [values], (err, data) => {
    if (err) throw err;

    return res.json(data);
  });
});

app.get("/getresponse/:email/:password", async (req, res) => {
  const sql = "SELECT * FROM login WHERE email = ? AND password = ?";

  const values = [req.body.email, req.body.password];

  db.query(sql, [values], (err, data) => {
    if (err) {
      res.send({ err: err });
    }

    if (result) {
      res.send(data);

      res.send({ message: "You logged in" });
    } else {
      res.send({ message: "Wrong combination" });
    }
  });
});
app.get("/api/v1/employees", (req, res) => {
  const sql = "SELECT * FROM employees";

  db.query(sql, (err, data) => {
    if (err) throw err;

    return res.json(data);
  });
});

app.post("/api/v1/employees", upload.single("image"), (req, res) => {
  const sql =
    "INSERT INTO employees (`image`,`first_name`,`last_name`,`email_id`,`department`,`salary`,`gender`,`dob`) VALUES (?)";

  const values = [
    req.file.buffer.toString("base64"),

    req.body.firstName,

    req.body.lastName,

    req.body.emailId,

    req.body.department,

    req.body.salary,

    req.body.gender,

    req.body.dob,
  ];

  db.query(sql, [values], (err, data) => {
    if (err) throw err;

    return res.json(data);
  });
});

app.get("/api/v1/employees/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM employees WHERE ID = ?";
  db.query(sql, [id], (err, data) => {
    if (err) throw err;

    return res.json(data);
  });
});

app.put("/api/v1/employee/:id", (req, res) => {
  const sql =
    "UPDATE employees SET  `first_name` = ?,`last_name` = ?,`email_id` = ?,`department` = ?,`salary` = ?,`gender` = ?,`dob` = ?,`image` = ? WHERE ID = ?";

  const values = [
    req.body.firstName,
    req.body.lastName,
    req.body.emailId,
    req.body.department,
    req.body.salary,
    req.body.gender,
    req.body.dob,
    req.body.image,
  ];

  const id = req.params.id;

  db.query(sql, [...values, id], (err, data) => {
    if (err) return res.json("Error");

    return res.json(data);
  });
});

app.delete("/api/v1/employees/:id", (req, res) => {
  const sql = "DELETE FROM employees WHERE ID = ?";

  const id = req.params.id;

  db.query(sql, [id], (err, data) => {
    if (err) throw err;

    return res.json(data);
  });
});

app.listen(8090, () => {
  console.log("listening");
});
