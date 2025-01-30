const api = require('axios');
const cron = require('node-cron');
const cheerio = require('cheerio');
const https = require('https');
const saveExchangeRate = require('../database/queries').saveExchangeRate


// specify the URL of the site to crawl
const targetUrl = 'https://www.bcv.org.ve/';

const agent = new https.Agent({
  rejectUnauthorized: false, // Ignorar la verificación del certificado
});

// define the crawler
async function getExchangeRate() {
  try {
    const response = await api.get(targetUrl, {
      httpsAgent: agent
    })
    if (response.status === 200) {
        // Load HTML on Cheerio
        const $ = cheerio.load(response.data);

        // Extract the value of the bs/USD exchange rate
        const exchangeRate = $('#dolar .field-content .row.recuadrotsmc .col-sm-6.col-xs-6.centrado').text().trim();
        await saveExchangeRate(exchangeRate);
    } else {
        console.error(`Error: Código de estado ${response.status}`);
    }
  } catch (error) {
    console.error(`Error fetching ${targetUrl}`);
  }
}

// Define the cron task */2 * * * * *
export const cronTask = cron.schedule('0 13 * * *', async () => {
  await getExchangeRate();
  console.log('>>> New exchange rate saved');
}, {
  timezone: "America/Caracas" // Replace with your timezone if needed
});