const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const foodRSS = require('./foodRSS');
const bodyParser = require('body-parser');
const sql = require('mssql');

const backURL = "http://localhost:3001";
const sqlConfig = {
    user: 'back',
    password: 'Password1',
    server: 'DESKTOP-S5SSUD6',
    database: 'Vkysite',

    "options": {
      "encrypt": true,
      "enableArithAbort": true
      }
}

app.use(cors());
app.use(express.static('assets'));
app.options('*', cors());
app.use(bodyParser.json());

app.get('/api/images', (request, response) => {
    fs.readdir('assets/images', (err, files) => {
      if (err) {
        console.log(err);
        return response.status(404).json({ error: 'content missing' });
      }
      const urls = files.map(x => backURL + '/images/' + x);
      response.send(urls);
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
  sql.connect(sqlConfig, (err) => {
    if (err) console.log(err)
    var sqlRequest = new sql.Request();
    var sqlQuery = 'select * from dbo.Tj'
    sqlRequest.query(sqlQuery, (err, data) => {
      if (err) console.log(err);

      var dateCurrent = new Date()
      var formattedTjList = data.recordset.map(tj => {
        var date = new Date(tj.DateString)
        var newTj = {desc: tj.TJDesc, num: Math.ceil((date.getTime() - dateCurrent.getTime()) / (1000 * 3600 * 24))}
        
        return newTj
      })
      response.send(formattedTjList)
    })
  })
})

app.post('/api/tj', (request, response) => {
  var desc = request.body.desc
  var dateString = request.body.date

  var sqlRequest = new sql.Request();
  var sqlQuery = 'insert into dbo.Tj values (\'' + desc + '\', \'' + dateString + '\')'
  
  sql.connect(sqlConfig, (err) => {
    if (err) console.log(err);


    sqlRequest.query('select * from dbo.Tj', (err, data) => {
      if (err) console.log(err);

      if (!data.recordset.find( x => x.TJDesc == desc)){
        sqlRequest.query(sqlQuery, (err) => {
          if (err) console.log(err)
          console.log(sqlQuery + " inserted into db")
        })
      }
    
  })
})
})


app.get('/api/food', (request, response) => {
  fs.readFile('assets/foodMenu.json', (err,data) =>{
    response.send(JSON.parse(data))
  })
})

app.delete('/api/tj', (request, response) => {
  var deleteDesc = request.body.desc
  var sqlRequest = new sql.Request();
  var sqlQuery = 'delete from dbo.Tj where TJDesc = \'' + deleteDesc + '\''

  sql.connect(sqlConfig, (err) => {
    if (err) console.log(err);

    sqlRequest.query(sqlQuery, (err) => {
      if (err) console.log(err);
      
      console.log("Tj deleted: ", deleteDesc)
      response.status(200).json({message: "content removed"})
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