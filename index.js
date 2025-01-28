const express = require('express');
const app = express();
const cors = require('cors')
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const path = require('path');
const port = 5500;

app.use(cors())
dotenv.config();
app.use(express.json()); 

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html')); // Path to your HTML file
});

const URL = process.env.URL;
mongoose
.connect(URL)
.then(()=> {console.log("connected")})
.catch((error)=>{console.log("error : ",error)})

app.use(routes);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});