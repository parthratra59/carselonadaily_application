import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connection from "./config/database.js";
import Userdata from "./routes/user.route.js"



const app = express();

// Config dotenv
dotenv.config();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const Port = process.env.PORT || 3000;


const corsOptions = {
  origin: "*",
 
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Welcome to my API",
  });
});


app.use("/api/v1/users", Userdata)

// Connect database and start server
connection
  .query("SELECT 1")
  .then(() => {
    console.log("Database connected");
    app.listen(Port, () => {
      console.log(`Server is running on port ${Port}`);
    });
  })
  .catch((error) => {
    console.error("Couldn't connect to Database", error);
    process.exit(1); // Exit process with failure
  });

