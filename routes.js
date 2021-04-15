const mongoose = require("mongoose"); // mongoose käyttöön.
const express = require("express"); // express käyttöön.
const mongo = require("./restaurantdata"); // normaali Schema data.
const router = express.Router();

router.get("/api/getall", (req, res) => {
  mongo
    .find({}, (err, results) => {
      res.json(results, 200);
    })
    .limit(20); // Rajoitetaan hakutulokset 20kpl.
});

// Haetaan ravintoloita tietyn id:n mukaan.
router.get("/api/hae/:id", (req, res) => {
  let query = { _id: req.params.id };
  mongo.find(query, (err, results) => {
    // Käytetään erillistä schema modulia.
    if (err) res.send(err);
    console.log("Ravintoloita haettiin id:llä " + req.params.id);
    res.status(200).json(results);
  });
});
// Haetaan ravintoloita alueen mukaan. Esim Queens.
router.get("/api/alue/:area", (req, res) => {
  let query = { borough: req.params.area }; // Borough on kenttä tietokannassa, jonka mukaan haku tehdään.

  mongo // Erillinen schema moduli.
    .find(query, (err, results) => {
      if (err) res.send(err);
      console.log("Ravintoloita haettiin alueen mukaan " + req.params.area);
      res.status(200).json(results);
    })
    .limit(5); // rajoitetaan hakutulokset 5kpl.
});

// Poistetaan id:n mukaan ravintola.
router.delete("/api/delete/:id", (req, res) => {
  // Määritellään id findByIdAndDelete haku parametria varten.
  let id = req.params.id;
  mongo.findByIdAndDelete(id, (err) => {
    if (err) return res.status(200).send(err);
    console.log("Deleted id: " + req.params.id);
    res.send("Deleted id: " + req.params.id); // Lähetetään vastaus
  });
});
module.exports = router; // Reitti käyttöön.
