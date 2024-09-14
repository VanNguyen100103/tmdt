const express = require('express');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const connectDatabase = require('./config/database.js');
const initRoutes = require('./routes/index');
const app = express();

const port = process.env.PORT || 8888;
app.use(express.json());
app.use(express.urlencoded({ extended: true}))
connectDatabase();
initRoutes(app);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
}
);