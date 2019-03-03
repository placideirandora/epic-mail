import express from "express";
import morgan from "morgan";

const app = express();

app.use(morgan("dev"));

app.use("/api/v1", (req, res) => {
  res.json({
    status: 200,
    message: "Welcome To EPIC Mail RESTFul API Endpoints",
  });
});

app.use((req, res) => {
  res.json({
    status: 404,
    error: "route not found",
  });
});

app.use((error, req, res, next) => {
  res.status(error.status || 400);
  res.json({
    status: 400,
    error: error.message,
    next,
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
