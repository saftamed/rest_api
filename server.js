require("dotenv").config({ path: "./config/.env" });
let mongoose = require("mongoose");
const User = require("./models/User");


const express = require("express");
const app = express();

var md5 = require("md5");

// Connect To DataBase
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.error("Database connection error");
  });

// to support json and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded());


// add new user
app.post("/user", function (req, res) {
  req.body.password = md5(req.body.password);
  var user = new User(req.body);

  user.save(function (err, data) {
    if (err) {
      res.status(409);
      res.send("Data not inserted");
      console.log(err);
    } else {
        res.send(data);
    }
  });
});

// get all users
app.get("/users", function (req, res) {
  User.find(function (err, data) {
    if (err) {
      res.status(409);
      res.send("Data not fetched");
      console.log(err);
    } else {
      res.send(data);
    }
  });
});

//update a user
app.put("/update", function (req, res) {
  var da = { ...req.body };
  delete da.id;
  User.findByIdAndUpdate(
    req.body.id,
    da,
    {
      new: true,
    },
    function (err, data) {
      if (err) {
        res.status(409);
        res.send("Data not fetched");
        console.log(err);
      } else {
        res.send(data);
        console.log("Data updated!");
      }
    }
  );
});

//delete a user
app.delete("/delete", function (req, res) {
  User.findByIdAndDelete(req.body.id, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
      console.log("Data Deleted!");
    }
  });
});


//star the server
app.listen(4000, function () {
  console.log("server Started !!");
});
