const express = require('express');
const cors = require('cors');
const app = express();
const port = 5001;
const mongoDB = require('./dbs');


app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With,Conntent-Type, Accept"
  );
  next();


})

// Enable CORS
app.use(cors());
// Connect to MongoDB
mongoDB();

// Hello World route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// API route for user creation
app.use('/api/', require('./Routes/Createuser'));
app.use('/api/', require('./Routes/DisplayData'));
app.use('/api/', require('./Routes/Orderdata'));


// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
  