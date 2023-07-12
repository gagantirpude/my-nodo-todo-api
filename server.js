//Import
import app from "./app.js";
import connectDB from "./data/database.js";

//Database
connectDB();

// Server Listen
app.listen(process.env.PORT, () => {
  console.log(
    `Server Running on Port ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});
