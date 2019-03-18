const express = require('express');
const app = express();
const fs = require('fs');
const fetch = require('node-fetch');

const port = process.env.PORT || 5000;

const companies_data = JSON.parse(fs.readFileSync('./companies_data.json', 'utf8'));

const router = express.Router();

router.get('/api/companies', (req, res) => {
  res.status(200).json(companies_data)
})

router.get('/api/company/:sygla', (req, res) => {
  const sygla = req.params.sygla;
  console.log(typeof sygla);
  const baseUrl =  'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=';
  const apiID = '&outputsize=compact&apikey=X86NOH6II01P7R24';
  const userLocation = (url1, url2, sygla) => {
    let newUrl = url1 + sygla + url2;
    return newUrl;
  };
  const apiUrl = userLocation(baseUrl, apiID, sygla);

  fetch(apiUrl)
  .then( response => response.json())
  .then( data => {
    res.send({data})
  })
  .catch( err => {
    consol.log(error);
  })
})

app.use(router);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})
