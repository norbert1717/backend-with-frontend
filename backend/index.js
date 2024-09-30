
/* 
cd mappaváltás
cd.. előző mappába ugrás
settimeout - megadom, hogy hiába olvasta be a fájlt a backend, 5 mp-vel később küldje a választ


a post requesteket egy új endpoint fogja fogadni
ezekután már csak el kell menteni a json file-ba
push-al belerakjuk a file-ba, majd írunk egy writefile metódust
első elem a hely, második, hogy mit szeretnénk, majd stringgé kell alaítani, mert csak stringet tud beolvasni

atadbázis módosítás, az adatoknak létre kell hozni egyedi azonosítókat, hogy könnyen módosítható vagy törölhető legyen
math.random segitségével le generál random számokat, átalakítja stringgé, így 10 számjegyből fog állni az idnk
generateid függvény
  randomot megszorozza 10-el, majd lefele kerekíti és ebből készít egy stringet
void azt jelenti, hogy nicns visszatérési érték
jön a loop és akkor 10x lefuttatja a kódot és kész az id
checkifunique függvény 2 paraméterrel, a függvény célja, hogy vesz egy arrayt a meglévő id-kal és megnézi,
hogy az új id szerepel-e az arrayben
ha az új id egyezik már egy meglévő-vel, akkor false-t dobjon vissza, mert nem egyedi az id
ids arrayt is bővítem az id-val nem csak a drinks.jsont

jön az fs readfile method
drinks.json beolvasása
jsondata.foreach drinkobj készítek egy id-t, amiben meghívom a generateid függvényt
majd ellenőrzöm, hogy a newid unique-e, amiből kapok egy true-t vagy egy false-t
while hasznos, amikor nem tudjuk hányszor kell lefutnia a függvénynek, addig fut, amig false nem lesz

a request body olyan object, mint amilyen a drinks.json-ban vannak csak id nélkül
cél, hogy kibővítsük id kulcsokkal, mielőtt a backendre beérkezik
készítünk egy arrayt, ahol csak az id-k vannak
id-s lesz az
az adatbázist folyamatosan elrontjuk, hogy lépésről lépésre haladjunk a megoldás felé, így az id nélküli új elemeket kitörölhetjük menet közben
majd egy while ciklussal ellenőrzöm az id-t
utána a req bodyt kimentem egy változóba és a newdrinkobj-t pusholom bele a jsondatába

endpointok:
backendnél jön a request és megy a response
middle wearekkel tudjuk megadni a köztes részeket
/ - az alap állapotot mutatja meg, a kezdőoldalt, ahol az index.html töltődik be
/public - átirányítja a requestet egy másik statikus mappához az express.static metódussal
/data - drinks.json file beolvasása és a tartalom visszaküldése
/data/new - 

generateid függvény - string formájában összefűz 10 db random számjegyet
isunique függvény - id array és új id alapján megnézi, hogy az adott id megtalálható-e az arrayben, ha az érték egyedi visszaadja, h true
app.get / - az alap endpoint, index.html-t szolgálja ki, amiben kell egy script.js és egy style.css
app.use/public - kiszolgálja a statikus file-okat
app.get/data - visszaadjuk a drinks.json tartalmát
app.post/data/new - post endpoint, ezt nem tudjuk böngészőből tesztelni, postman vagy frontendből tudjuk
  beolvassuk az adatot és átalakítjuk json file-vá, készítünk egy ids arrayt és map metódussal kiszedjük az id-kat
  newid készítése, és while segítségével futtatunk egy loopot, amig nem lesz egyedi az id-nk
  newdrinkobj néven kimentjük a request bodyban található objektet, és az id kulcsban megkapja az új id-kat, majd belepusholjuk az arraybe


kell egy delete endpoint is
  id alapján tudunk rákeresni
  majd a readfile-al tudjuk a drinks.jsonból kiszedni az adatot
  filterrel egy tömböt kapunk az általunk keresett objektum értékével
  backendből nem törlünk, csak rámutatunk arra az elemre, amit ki akarunk törölni
  rá mutatunk arra az értékre és nem mentjük ki, csak a filter arrayt kell kimenteni 
  
2024.09.25 
refaktorálás - kommentelés, kód újraszervezés

2024.09.27

drinks_url globálisan létrehozva a drinks.json file elérése
rename symbol-al a keyboard shortcuts-nál mindent át tudunk írni
ha elkezdünk valamit többször, akkor ki lehet szervezni külön függvényekbe és csak meg kell hívni af üggvényt
void - nincs visszatérési érték
olyan segédfüggvény létrehozása, ami képes létrehozni az adott filét és visszatérni értékkel
ha fs helyett a readfile meg a writefile-t importálom, akkor ki lehet törölni mindenhol az fs.-t mindenhonnan
readandparsefile függvény után új import kell, mert nincs visszatérési értéke, ami promisenak kell lenni
két függvény nem lehet ugyanolyan nevű, ezért kell másnéven elérni ugyanazt a függvényt
és a függvényben a readfile helyett a readfilepromise függvényt hívjuk meg
return-el ki kell egészíteni a függvényt, hogy legyen visszatérési értéke
/data endpointban módosítom és a filedatába mentem le a readandparsefile-t
  az eredmény egy promise, itt jön a .then vagy az await
  ezt lehet implementálni minden file olvasáshoz
/data/new enpdointnál bővebb a kód, itt nem tudja kiváltani az egész callbacket
arrayofId-s array: végig iterál az arrayen a find metódus és megnézi, hogy az elem egyezik-e a newId-val

*/


import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFile, writeFile } from 'fs';
import { readFile as readFilePromise } from 'fs/promises';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

const PORT = 3000;
const DRINKS_URL = `${__dirname}/data/drinks.json`;

const generateId = () => {
  let newId = "";

  for (let i = 0; i < 10; i++) {
    newId += Math.floor(Math.random() * 10);
  }

  return newId;
}

const generateUniqueId = (idsArray, generate) => {
  let newId = generate();

  // while the generated id can be found in the existing ids, generate a new one
  while (idsArray.find(id => id === newId)) {
    newId = generate();
  }

  return newId;
}

async function readAndParseFile(fileUrl) {
  try {
    const data = await readFilePromise(fileUrl, 'utf8');
    const jsonData = JSON.parse(data);

    return jsonData;
  } catch (err) {
    console.error('Error reading or parsing the JSON file:', err);
  }
}

app.use(express.json());

app.get('/', (req, res) => res.sendFile(join(__dirname, '/../frontend/index.html')));

app.use('/public', express.static(join(__dirname, '/../frontend/static')));

app.get('/data', async (req, res) => {
  const fileData = await readAndParseFile(DRINKS_URL);
  res.json(fileData);
});

app.post('/data/new', async (req, res) => {
  const fileData = await readAndParseFile(DRINKS_URL);

  const ids = fileData.map(drinkObj => drinkObj.id);
  const newId = generateUniqueId(ids, generateId);

  // create a new object, from req.body and a new id key
  const newDrinkObj = { ...req.body, id: newId };

  fileData.push(newDrinkObj);

  try {
    writeFile(DRINKS_URL, JSON.stringify(fileData, null, 2), () => res.json(newDrinkObj.id));
  } catch (err) {
    console.log("error at writing file", err);
    res.status(500).json("error at writing file");
  }
});

app.delete('/data/delete/:id', async (req, res) => {
  const deleteId = req.params.id;

  const fileData = await readAndParseFile(DRINKS_URL);

  // if deleteId is in the fileData, delete the associated object
  if (fileData.find(obj => obj.id === deleteId)) {

    // filter all the objects from the fileData, that has the same id as deleteId (should be only one match)
    const filteredArray = fileData.filter(obj => obj.id !== deleteId);

    writeFile(DRINKS_URL, JSON.stringify(filteredArray, null, 2), () => res.json(deleteId));
  } else { // else return that deleteId is not found in the fileData
    res.status(404).json(`${deleteId} is not found`);
  }
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}`));
