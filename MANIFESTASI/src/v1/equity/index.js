const fetchdata = require("../../utils/fetchdata.js")
module.exports = async(req, res) => {
  var symbol = req.params.symbol
  symbol = symbol.toUpperCase()
  if(symbol.length > 4){
    res.status(404)
    return res.json({
      "status": 404,
      "message": "Parameter length is larger than 4"
    })
  }
  let data = await fetchdata(symbol)
  if(data.message == "Successfully retrieved company data"){
    data = data.data
    if(data.sector == "Indeks"){
      res.status(404)
      return res.json({
        "status": 404,
        "message": "Parameter is not an equity"
      })
    }
    res.status(200)
    res.json({
      "status": 200,
      "message": "Success",
      "symbol": data.symbol,
      "companyName": data.name,
      "sector": data.sector,
      "currentPrice": data.price,
      "change": data.change,
      "changePercentage": data.percentage,
      "volume": data.volume,
      "date": data.date,
      "orderBook": data.orderbook,
      "isUMA": data.uma,
      "countryOrigin": data.country,
      "exchangeOrigin": data.exchange,
      "hasCorporateAction": data.corp_action.active,
      "onIndex": data.indexes,
    })
  }else{
    res.status(404)
    res.json({
      "status": 404,
      "Message": "Equity not found"
    })
  }
  
} 