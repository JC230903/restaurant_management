const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost:27017/foodie';

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB");

    const fetched_Data = await mongoose.connection.db.collection("food_cat");
    fetched_Data.find({}).toArray(async function(err, data) {
      if (err) {
        console.log(err);
      } else {
        global.food_cat = data;

        const foodCategory = await mongoose.connection.db.collection("food_rest");
        foodCategory.find({}).toArray(function(err, catData) {
          if (err) {
            console.log(err);
          } else {
            global.food_rest = catData;
          }
        });
      }
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

module.exports = mongoDB;
