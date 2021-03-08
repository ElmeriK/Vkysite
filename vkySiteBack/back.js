const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const foodRSS = require('./foodRSS')
const bodyParser = require('body-parser');

const backURL = ""

app.use(cors());
app.use(express.static('assets'));
app.use(bodyParser.json())

app.get('/api/images', (request, response) => {
    fs.readdir('assets/images', (err, files) => {
      if (err) {
        console.log(err)
        return response.status(404).json({ error: 'content missing' })
      }
      const urls = files.map(x => backURL + '/images/' + x);
      response.send(urls)
    });
  });

app.get('/api/videos', (request, response) => {
  fs.readFile('assets/videos.json', (err, data) => {
    if (err) {
      console.log(err)
      return response.status(404).json({ error: 'content missing' })
    }
    var videos = JSON.parse(data)
    response.send(videos)
  })
})

app.get('/api/tj', (request, response) => {
  fs.readFile('assets/tjList.json', (err,data) => {
    if (err) {
      console.log(err)
      return response.status(404).json({ error: 'content missing' })
    }
    var tjList = JSON.parse(data)
    var dateCurrent = new Date()
    var formattedTjList = tjList.map(tj => {
      var date = new Date(tj.date)
      var newTj = {desc: tj.desc, num: Math.ceil((date.getTime() - dateCurrent.getTime()) / (1000 * 3600 * 24))}
      return newTj
    })
    response.send(formattedTjList)
  })
})

app.post('/api/tj', (request, response) => {
  var desc = request.body.desc
  var dateString = request.body.date
  
  fs.readFile('assets/tjList.json', (err,data) => {
    if (err) {
      console.log(err)
    }

    var tjList = JSON.parse(data)
    if (!tjList.find(element => element.desc == desc)){
      tjList.push({desc: desc, date: dateString})
      fs.writeFile('assets/tjList.json', JSON.stringify(tjList), (err) => {
        console.log("New tj saved: ", desc)
        if (err) {
          console.log(err)
        }
      })
    }
  })
})

app.get('/api/food', (request, response) => {
  fs.readFile('assets/foodMenu.json', (err,data) =>{
    response.send(JSON.parse(data))
  })
})

app.delete('/api/tj', (request, response) => {
  var deleteDesc = request.body.desc
  fs.readFile('assets/tjList.json', (err,data) => {
    if (err) {
      console.log(err)
    }

    var tjList = JSON.parse(data)
    var newTjList = tjList.filter (tj =>{
      return tj.desc !==deleteDesc
    })
    fs.writeFile('assets/tjList.json', JSON.stringify(newTjList), (err) => {
      console.log("Tj deleted: ", deleteDesc)
      response.status(200).json({message: "content removed"})
      if (err) {
        console.log(err)
      }
      
      
    })
  })
})



function updateFood() {
  var d = new Date()
  foodRSS.getFood().then(response => (
    fs.writeFile('assets/foodMenu.json', response, (err) => {
      if (err) {
        console.log(err)
        return
      }
      console.log("Food updated at: ", d.getHours(), ":", d.getMinutes())
    })
  ))
}

const PORT = process.env.PORT || 3001
updateFood()
setInterval(updateFood, 1000*60*60)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});