
/* 
cd mappaváltás
cd.. előző mappába ugrás
settimeout - megadom, hogy hiába olvasta be a fájlt a backend, 5 mp-vel később küldje a választ
 */


const express = require('express')
const path = require('path')
const fs = require('fs')

const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/../frontend/index.html'))
})

app.use('/static', express.static(path.join(__dirname, '/../frontend/static')))

app.get('/data', (req, res) => {
    fs.readFile(`${__dirname}/data/drinks.json`, (err, data) => {
        if (err) {
            console.log("error at reading the file", err)
            res.json("error at reading the file")
        } else {
            const jsonData = JSON.parse(data)
            const result = jsonData.map(obj => obj)
            res.json(jsonData)
        }
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
