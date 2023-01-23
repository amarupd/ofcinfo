const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.port || 8050;

var corOption = {
    origin: "http://localhost:8081",
};

app.use(cors(corOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = require("./routes/route");
app.use("/", router);
app.get("", (req, res) => {
    res.json({ message: "hello from api" });
});

app.listen(port, () => {
    console.log(`server is listening to the port number :- ${port}`);
});
