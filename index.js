const PORT = process.env.PORT || 8081;
var mongoose = require("mongoose"); // mongoose käyttöön

const uri = process.env.DB_uri;
var express = require("express"); // express käyttöön
var app = express();
var cors = require("cors"); // otetaan cors käyttöön herokun suojauksien takia.
app.use(express.static("./public"));

// app käyttöön
app.use(express.urlencoded({ extended: true }));
// Pakolliset mongoose parametrit
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
// Tulostetaan tieto mahdollisesta yhdistämisestä / yhteydestä.
db.on("error", function () {
  console.log("Yhteysvirhe!");
});

db.once("open", function () {
  console.log("Yhteys muodostettu");
});

// ohje sivu
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
// Määritellään Schema ravintoloita varten.
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

// Haetaan kaikki data ravintoloista
app.get("/api/getall", function (req, res) {
  raflat.find({}, function (err, results) {
    res.json(results, 200);
  });
});
// Haetaan ravintoloita tietyn id:n mukaan
app.get("/api/hae/:id", function (req, res) {
  let query = { _id: req.params.id };
  raflat.find(query, function (err, results) {
    if (err) res.send(err);
    console.log("Ravintoloita haettiin id:llä " + req.params.id);
    res.status(200).json(results);
  });
});
// Haetaan ravintoloita alueen mukaan. Esim Queens.
app.get("/api/alue/:area", function (req, res) {
  let query = { borough: req.params.area }; // Borough on kenttä tietokannassa, jonka mukaan haku tehdään.
  raflat.find(query, function (err, results) {
    if (err) res.send(err);
    console.log("Ravintoloita haettiin alueen mukaan " + req.params.area);
    res.status(200).json(results);
  });
});

// Lisätään kentät name, borough, cuisine uuden ravintolan lisäystä varten.
app.post("/api/add/", function (req, res) {
  let newRestaurant = new raflat({
    name: req.body.name,
    borough: req.body.borough,
    cuisine: req.body.cuisine,
  });
  // Otetaan talteen kentät ja lisätään ne tietokantaan.
  newRestaurant.save(function (err, result) {
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
app.put("/api/update/:id", function (req, res) {
  raflat.findOneAndUpdate(req.params.id, req.body, { new: true }, (err) => {
    if (err) return res.status(200).send(err);
    console.log("Päivitetty " + req.params.id);
    res.send("Päivitetty " + req.params.id); // Lähetetään vastaus
  });
});
// Poistetaan id:n mukaan ravintola.
app.delete("/api/delete/:id", function (req, res) {
  // Määritellään id findByIdAndDelete haku parametria varten.
  let id = req.params.id;
  raflat.findByIdAndDelete(id, function (err) {
    if (err) return res.status(200).send(err);
    console.log("Deleted id: " + req.params.id);
    res.send("Deleted id: " + req.params.id); // Lähetetään vastaus
  });
});
// Kuunnellaan porttia 8081
app.listen(PORT, () => {
  console.log("Listening port 8081.");
});
