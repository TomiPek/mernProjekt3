const PORT = process.env.PORT || 8081;
const mongoose = require("mongoose"); // mongoose käyttöön.

const uri = process.env.DB_uri;
const express = require("express"); // express käyttöön.
const app = express(); // app käyttää expressiä.
const cors = require("cors"); // otetaan cors käyttöön herokun suojauksien takia.
app.use(express.static("./public"));
const restaurantSchema = require("./updates"); //päivityksiä varten Schemat.
const mongo = require("./restaurantdata"); // Schema data.
const route = require("./routes"); // Reiteistä osa sijaitsee routes tiedossa. Otetaan käyttöön ne.
app.use("/", route);

// app käyttöön.
app.use(express.urlencoded({ extended: true }));
// Pakolliset mongoose parametrit.
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Tulostetaan tieto mahdollisesta yhdistämisestä / yhteydestä.
db.on("error", () => {
  console.log("Yhteysvirhe!");
});

db.once("open", () => {
  console.log("Yhteys muodostettu");
});

// ohje sivu.
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/api/add/", (req, res) => {
  let newRestaurant = new restaurantSchema({
    // Käytetään restaurantSchema modulia.
    name: req.body.name, // Täytettävät kentät
    borough: req.body.borough,
    cuisine: req.body.cuisine,
  });
  // Otetaan talteen kentät ja lisätään ne tietokantaan.
  newRestaurant.save((err, result) => {
    if (err) console.log(err);
    console.log(
      "Tallennettu: " + req.body.name + " sijainnissa: " + req.body.borough
    );
    res.status(200).json("Tallennus suoritettu");
  });
});

//findOneAndUpdate virheilmoituksia varten asetukset returnOriginal ja useFindAndModify.
mongoose.set("returnOriginal", false);
mongoose.set("useFindAndModify", false);
// Päivitetään haluttu ravintola / lisätään uusi. Ravintolan voi hakea esim id:n tai nimen mukaan ja jos nimen mukaan niin haku lisää uuden ravintolan tietokantaan.
app.put("/api/update/:id", (req, res) => {
  mongo.findOneAndUpdate(req.params.id, req.body, { new: true }, (err) => {
    if (err) return res.status(200).send(err);
    console.log("Päivitetty " + req.params.id);
    res.send("Päivitetty " + req.params.id); // Lähetetään vastaus
  });
});

// Kuunnellaan porttia 8081
app.listen(PORT, () => {
  console.log("Listening port 8081.");
});
