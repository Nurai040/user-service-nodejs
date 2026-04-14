import express from "express";
import userRoutes from "./routes/user.route.js";

const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
