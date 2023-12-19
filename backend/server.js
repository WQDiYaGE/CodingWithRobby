const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");


const notesController = require("./controllers/notesController");
const usersController = require("./controllers/usersController");

const requireAuth = require("./middleware/requireAuth");

if(process.env.NODE_ENV != "production") {
    require('dotenv').config();
}

const connectToDb = require("./config/connectToDb");


let app = express();

// Configure express app
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: true,
    credentials: true
}));


connectToDb();


app.get("/", (req, res) => {
    res.json({ hello: "world" });
});

app.post("/signup", usersController.signup);
app.post("/login", usersController.login);
app.get("/check-auth", requireAuth, usersController.checkAuth);

app.get("/logout", usersController.logout);


app.get("/notes", requireAuth, notesController.fetchNotes);
app.get("/notes/:id", requireAuth, notesController.fetchNote);
app.post("/notes", requireAuth, notesController.createNote);
app.put("/notes/:id", requireAuth, notesController.updateNote);
app.delete("/notes/:id", requireAuth, notesController.deleteNote);


app.listen(process.env.PORT);


