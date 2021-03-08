const Parser = require('rss-parser')
const parser = new Parser()

async function getFood() {
    var d = new Date()
    var day = d.getDay()
    var thisdate = d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear()
    var dayString = ""
  
    switch(day){
        case 0:
          dayString = "Sunnuntai"
          break
        case 1:
          dayString = "Maanantai"
          break
        case 2:
          dayString = "Tiistai"
          break
        case 3:
          dayString = "Keskiviikko"
          break
        case 4:
          dayString = "Torstai"
          break
        case 5:
          dayString = "Perjantai"
          break
        case 6:
          dayString = "Lauantai"
    }
  
    var url = "http://ruokalistat.leijonacatering.fi/rss/2/1/25f04a86-f813-e511-892b-78e3b50298fc"
    var feed = await parser.parseURL(url)
    const regex = new RegExp(/(\s([0-9]{0,2})[.]([0-9]{0,2})[.]([0-9]{0,4})\s)/g);
    const item = feed.items.find((item) =>  item.title.includes("Varusmies") && item.title.match(regex)[0].replace(/\s/g, "").includes(thisdate));    
    item.content = item.content.split(".")
    if (item !== undefined && item.content.length > 2) {
            var foodJson = JSON.stringify(item)
            return new Promise((resolve, reject) => {
                resolve(foodJson)
        })
    } else {
        console.log("No menu found")

    }    
        
        
    
}

module.exports = { getFood }