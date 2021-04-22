# mernProjekt3
Tämän työn heroku osoite on: https://mernprojekti3.herokuapp.com/ ja aiheena on ravintolat.

Projektin heroku osoitteesta löytyy kolme kappaletta erilaisia get tyyppisiä hakuja. Get tyyppiset vielä alempana esiteltynä.

api/getall, joka on rajattu, että haku etsii tuhansista ravintoloista 20 kpl.

api/hae/:id, jossa on id:n mukaan haku. Heroku osoitteessa on valmis esimerkki tapaus.

api/alue/:area, joka on tarkoitettu siihen, että käyttäjä voi hakea alueen mukaan ravintoloita. Haku on rajattu siten, että se hakee 5 kpl ravintoloita alueelta. Jälleen syynä tähän on tietokannan koko.

Muut haut ovat post eli lisääminen ja reitti tälle on api/add/. 

Put eli update. Reitti tälle on api/update/:id, jota käyttämällä käyttäjä voi tietyn id:n mukaan muokata jonkun ravintolan tietoja. Jos käyttäjä muokkaa nimi kenttää siinä tapauksessa lisätään tietokantaan kokonaan uusi ravintola

Delete tyyppinen toiminto on api/delete/:id se taas puolestaan poistaa tietokannasta ravintolan.

Tämä projekti käyttää myös reittejä (routes) ja moduleja. Osa reiteistä on index.js sisällä ja osa löytyy omasta routes.js nimisestä tiedostosta. Projektin schemat sijaitsevat restaurantdata.js tiedostossa ja update.js tiedostossa. Update.js sisältää api/update/:id hakua varten scheman ja muut haut käyttävät restaurantdata.js tiedostoa.

Projektin "serverinä" toimii index.js
