// API Key: f2dcd7db113fdda8f1ffd40e1d22f60b

// Dependencies
const axios = require("axios");
const { response } = require("express");
const express = require("express");
const fs = require("fs")

//Local
const query = require(__dirname + "/helpfulScripts.js")
const data = require(__dirname + "/data.js")

// Initialization
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

//List of every single cryptocurrency query id
listId = data.listId
 
//Exhanges Query
uniswapQuery = data.uniswapQuery

// ---------------------------------------------SERVER SECTION---------------------------------------------------

// ------Start Server---------
app.listen(1000, function () {
  console.log("Serer started on port 1000");
  console.log("-----------------------------------------");
});

// ------Get Requests---------
var uniswapVolumeDataHistory
app.get("/", function (req, res) {

  // ---- Uniswap Query -----
  var dataObject = query.fetchData(uniswapURL, uniswapQuery);
  dataObject.then(function (result) {
  let uniswapData = result
      let uniswapVolumeData = uniswapData //List
      uniswapVolumeData = uniswapVolumeData.reverse()
      
      //Uniswap Data Graph
      let uniswapChartData = {index: [], volume: []}
      for(i=0; i<uniswapVolumeData.length; i++){
        uniswapChartData.index.push(String(i+1))
        uniswapChartData.volume.push((Number(uniswapVolumeData[i].dailyVolumeUSD).toFixed(2))/1000000)
      }
      
    
      uniswapCurrentDayVolume = query.abbreviateNumber(uniswapChartData.volume[uniswapChartData.volume.length-1]*1000000)
    

  // --- Compound Query ---
  
    res.render("dashboard", {uniswapData: uniswapCurrentDayVolume, uniswapDataLabels: uniswapChartData.index, uniswapDataData: uniswapChartData.volume});
  });
});

app.get("/prices", function(req, res){
  // Fetch Query  

  async function run(){
    try {
      listQuery = await query.createListQuery(listId)
      console.log(listQuery);
  
      res.render("prices", 
    {
      btcPriceData: listQuery[0].toFixed(2),
      ethPriceData: listQuery[1].toFixed(2), 
      linkPriceData: listQuery[2].toFixed(2),
      uniPriceData: listQuery[3].toFixed(2),
      aavePriceData: listQuery[4].toFixed(2),
      mkrPriceData: listQuery[5].toFixed(2),
      maticPriceData: listQuery[6].toFixed(2),
      grtPriceData: listQuery[7].toFixed(2),
      compPriceData: listQuery[8].toFixed(2),
      sushiPriceData: listQuery[9].toFixed(2),
      yfiPriceData: listQuery[10].toFixed(2),
      amplPriceData: listQuery[11].toFixed(2),
      superPriceData: listQuery[12].toFixed(2),
      shibPriceData: listQuery[13].toFixed(6)
    })
    } catch (error) {
      console.log(error);
      
    }
  }
  run()
    
})


// ------Post Requests---------

app.post("/", function(req, res){
  res.redirect("/prices")
})

app.post("/prices", function(req,res){
  res.redirect("/")
})






