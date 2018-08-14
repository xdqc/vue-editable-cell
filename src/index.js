import http from "http";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import api from "./api";
import initializeDb from "./db";
import config from "./config.json";

let app = express();
app.server = http.createServer(app);

// logger
app.use(morgan('dev'));

// Cross-origin resource sharing middleware
app.use(cors({
	exposedHeaders: config.corsHeaders
}));

app.use(bodyParser.json({
	limit: config.bodyLimit
}));

// connect to db
initializeDb(db => {

	// api router
	app.use('/api', api({ config, db }));

	app.server.listen(process.env.PORT || config.port, () => {
		console.log(`Started on port ${app.server.address().port}`);
	});
});

export default app;
