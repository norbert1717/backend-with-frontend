console.log("loaded")

fetch('/data')
  .then(res => res.json())
  .then(data => console.log(data))