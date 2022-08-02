express = require("express");
app = express();

//
app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());


//
const fs = require("fs");



// router
const appRouter = require("./routes/index.router.js");
app.use("/", appRouter)


// read
app.get("/read", (req, res) => {
    fs.readFile("./data/demo.txt", "utf-8", (err, data) => {
        if (err) {
            return res.send(err);
        }
        return res.send(data);
    })
})


// write
app.get("/write", (req, res) => {
    var s = Date.now().toString();
    fs.writeFile("./data/demo.txt", s, "utf-8", (err, data) => {
        if (err) {
            return res.send(err);
        }
    })
    return res.send("write");  
});

// append
app.get("/append", (req, res) => {
    var s = "x";
    fs.appendFileSync("./data/demo.txt", s, "utf-8", (err) => {
        if (err) {
            return res.send(err);
        }
    })
    return res.send("Saved");
})



// error
app.get("*", (req, res) => {
    res.send("404: " + req.url);
})


process.on("uncaughtException", err => {
    console.log("EX: " + err.stack);
    process.exit(1);
});

// start server
app.listen(3000, () => { console.log(`Listening on port: 3000`); });

