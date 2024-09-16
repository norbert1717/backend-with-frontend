
/* 
cd mappaváltás
cd.. előző mappába ugrás
settimeout - megadom, hogy hiába olvasta be a fájlt a backend, 5 mp-vel később küldje a választ


a post requesteket egy új endpoint fogja fogadni
ezekután már csak el kell menteni a json file-ba
push-al belerakjuk a file-ba, majd írunk egy writefile metódust
első elem a hely, második, hogy mit szeretnénk, majd stringgé kell alaítani, mert csak stringet tud beolvasni*/


import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, '/../frontend/index.html'));
});

app.use('/public', express.static(join(__dirname, '/../frontend/static')));

app.get('/data', (req, res) => {
  fs.readFile(`${__dirname}/data/drinks.json`, (err, data) => {
    if (err) {
      console.log("error at reading file");
      res.json("error at reading file");
    } else {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    }
  });
});

app.post('/data/new', (req, res) => {
  console.log(req.body);

  fs.readFile(`${__dirname}/data/drinks.json`, (err, data) => {
    if (err) {
      console.log("error at reading file", err);
      res.json("error at reading file");
    } else {
      const jsonData = JSON.parse(data);
      
      jsonData.push(req.body);

      fs.writeFile(`${__dirname}/data/drinks.json`, JSON.stringify(jsonData, null, 2), (err) => {
        if (err) {
          console.log("error at writing file", err);
          res.status(500).json("error at writing file");
        } else {
          res.json("success");
        }
      })
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
