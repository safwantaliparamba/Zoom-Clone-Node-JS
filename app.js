/** @format */

const express = require("express");
const { generateToken } = require("./middleware");
var cors = require("cors");

const app = express();

const corsOptions = {
	origin: "http://localhost:5173",
	optionsSuccessStatus: 200, // For legacy browser support
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
	console.log(req.route.path);
	res.send({ StatusCode: 8000, message: "Success" });
});
app.post("/generate", generateToken, (req, res) => {
	const token = res.locals.token;

	res.send({
		StatusCode: 6000,
		token,
	});
});

app.listen(8000, () => {
	console.log("Running on port 8000");
});
