var mongoose = require("mongoose"); // mongoose käyttöön

const raflat = mongoose.model(
  "Ravintolat",
  {
    name: String,
    borough: String,
    restaurant_id: Number,
    grades: Array,
    cuisine: String,
  },
  "restaurants" // paikka tietokannassa missä dataa haetaan.
);

module.exports = raflat; // Otetaan käyttöön moduli.
