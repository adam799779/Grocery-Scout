const fetch = require('node-fetch');

const TOKEN = 'eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vYXBpLmtyb2dlci5jb20vdjEvLndlbGwta25vd24vandrcy5qc29uIiwia2lkIjoiWjRGZDNtc2tJSDg4aXJ0N0xCNWM2Zz09IiwidHlwIjoiSldUIn0.eyJhdWQiOiJncm9jZXJ5c2NvdXQtMjQzMjYxMjQzMDM0MjQ0YzZhNzA0NTYzNmI0YzQyNjY2YzMwNmQ0NDY1NTk3ODU5NDU3NjQxNDY3NTU0NzQ2NzMzMzY1NDMzNDI0ZTRiNjg2ZjQ3Nzc2MTRlNzk0YTUzNjU1NjYyNzU2YzcwNzI2MjUwNTQ0NDc5NzA4OTIzMjYzNjE4NjMzMzM5NSIsImV4cCI6MTc0NDk0MjkzNCwiaWF0IjoxNzQ0OTQxMTI5LCJpc3MiOiJhcGkua3JvZ2VyLmNvbSIsInN1YiI6IjJmYjJkMWNiLWY1OTUtNTM0ZC05NDJmLTE0MjExOTFhNWNjZiIsInNjb3BlIjoicHJvZHVjdC5jb21wYWN0IiwiYXV0aEF0IjoxNzQ0OTQxMTM0MTI1NjE5MDkxLCJhenAiOiJncm9jZXJ5c2NvdXQtMjQzMjYxMjQzMDM0MjQ0YzZhNzA0NTYzNmI0YzQyNjY2YzMwNmQ0NDY1NTk3ODU5NDU3NjQxNDY3NTU0NzQ2NzMzMzY1NDMzNDI0ZTRiNjg2ZjQ3Nzc2MTRlNzk0YTUzNjU1NjYyNzU2YzcwNzI2MjUwNTQ0NDc5NzA4OTIzMjYzNjE4NjMzMzM5NSJ9.Nz5z7ZVRD6VzVZsPAYj5bf-gnJ93Uv_SKsJtjg0NrYceS5OXvHFe1_6HG-jRkbBnbRt9TSQkn4GVyg7c2oggW0oPRItchYsN3vOlcGSKti-rK65iYr8bVKVAzBrG5F65gSHwHoLlXhxIttEG9DsxIjPWDfKTtemEu7C63K5gemRVe1apZNfd0Fevnm8U-AHHs0wNR3sg-bY-cksXJ4mb4FB-74pbchNF3AwV3AUVT_vBVwED8CONtRUUp74_lryD2IluE_NVx4sBjfawv2BDbH11ZMGClGdM-_D21MYt6jJk4ksNq9v-QYP97j5Q_9YBmZ1yZf6Wf5enYiPtV_zSTg'; // Keep your token
const LOCATION_ID = '01400943';
const SEARCH_TERM = 'eggs';

const testing = async (req, res) => {
  const url = `https://api.kroger.com/v1/products?filter.term=${SEARCH_TERM}&filter.locationId=${LOCATION_ID}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${TOKEN}`
      }
    });

    if (!response.ok) throw new Error(`HTTP ${response.status} - ${response.statusText}`);

    const data = await response.json();
    const items = data.data;
    console.log(items.length);
    if (!items || items.length === 0) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'No products found.' }));
      return;
    }

    const results = items.map(product => ({
      name: product.description,
      price: product.items[0]?.price?.regular || 'N/A'
    }));

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(results));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: error.message }));
  }
};

module.exports = { testing };
