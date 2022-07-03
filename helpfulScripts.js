const axios = require("axios");

uniswapURL = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2";
compoundURL = "https://api.thegraph.com/subgraphs/name/graphprotocol/compound-v2"


let listQueryData = []
let ethUSDValue = 0
firstTime = true
exports.createListQuery = async (idList) =>{ //idList is a dictionary
    for (const [Name, id] of Object.entries(idList)){
        query =  await this.createQuery(id)
        queryData = await this.fetchData(uniswapURL, query)
        if (firstTime){
            firstTime = false
            ethUSDValue = 1/queryData[0].derivedETH
        }else{

            listQueryData.push((queryData[0].derivedETH * ethUSDValue))
        }
        
    }
    return listQueryData
}



exports.createQuery = (id) => { 
    
    return `
  {
    tokens(orderBy:tradeVolumeUSD, orderDirection:desc, where:{id:"${id}"}){
      id
      symbol
      derivedETH
      tradeVolumeUSD
      totalLiquidity
      
    }
  }`
  
}

exports.fetchData = async (url, dataQuery) => {
    try {
      const result = await axios.post(url, {
        query: `${dataQuery}`,
      });
      keyQuery = Object.keys(result.data.data)[0]
      const queryData = await result.data.data[keyQuery];
     
      return await queryData;
    } catch (error) {
    }
  };


exports.abbreviateNumber = function (num, fixed) {
    if (num === null) {
      return null;
    } // terminate early
    if (num === 0) {
      return "0";
    } // terminate early
    fixed = !fixed || fixed < 0 ? 0 : fixed; // number of decimal places to show
    var b = num.toPrecision(2).split("e"), // get power
      k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3), // floor at decimals, ceiling at trillions
      c =
        k < 1
          ? num.toFixed(0 + fixed)
          : (num / Math.pow(10, k * 3)).toFixed(1 + fixed), // divide by power
      d = c < 0 ? c : Math.abs(c), // enforce -0 is 0
      e = d + ["", "K", "M", "B", "T"][k]; // append power
    return e;
};