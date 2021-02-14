
const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const router = express.Router();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const users = require("./routes/users");
const events = require("./routes/events");
const auth = require("./routes/auth");

// connect to mongoDb with mongoose
const dbUrl = process.env.DATABASE_URL;
mongoose.connect(
    dbUrl,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    },
    function (error) {
        if (error) { 
            console.log("Error!" + error);
        } else {
            console.log("Connencted to db");
        }
    }
);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/users", users);
app.use("/events", events);
app.use("/auth", auth);


app.get("/", (req, res) => {
    res.send("HaKometz");
});

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
});