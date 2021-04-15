const mongoose = require("mongoose");

const restaurantSchema = mongoose.model(
  "uudetRavintolat",
  {
    name: String,
    borough: String,
    cuisine: String,
  },
  "restaurants" // paikka tietokannassa missä dataa haetaan.
);
module.exports = restaurantSchema; // Otetaan käyttöön moduli.
