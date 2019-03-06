import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import user from "./routes/user";
import message from "./routes/message";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan("dev"));

app.use("/api/v1", user);
app.use("/api/v1", message);

app.use((req, res) => {
  res.status(404).json({ status: 404, error: "route not found" });
});

app.use((error, req, res, next) => {
  res.status(400).json({ status: 400, error: error.message, next });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

export default app;
