const express = require('express');
const app = express();
const fs = require('fs');
const port = process.env.PORT || 5000;

const companies_data = JSON.parse(fs.readFileSync('./companies_data.json', 'utf8'));

const router = express.Router();

router.get('/api/companies', (req,res) => {
  res.status(200).json(companies_data)
})

app.use(router);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})
