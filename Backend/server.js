require("dotenv").config();
const app = require("./app");

const PORT = process.env.PORT || 4000;

const connectDB = require("./db/db");
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
