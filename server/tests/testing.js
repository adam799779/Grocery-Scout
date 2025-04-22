const fetch = require('node-fetch');

const TOKEN = 'eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vYXBpLmtyb2dlci5jb20vdjEvLndlbGwta25vd24vandrcy5qc29uIiwia2lkIjoiWjRGZDNtc2tJSDg4aXJ0N0xCNWM2Zz09IiwidHlwIjoiSldUIn0.eyJhdWQiOiJncm9jZXJ5c2NvdXQtMjQzMjYxMjQzMDM0MjQ0YzZhNzA0NTYzNmI0YzQyNjY2YzMwNmQ0NDY1NTk3ODU5NDU3NjQxNDY3NTU0NzQ2NzMzMzY1NDMzNDI0ZTRiNjg2ZjQ3Nzc2MTRlNzk0YTUzNjU1NjYyNzU2YzcwNzI2MjUwNTQ0NDc5NzA4OTIzMjYzNjE4NjMzMzM5NSIsImV4cCI6MTc0NTI4NjM2NSwiaWF0IjoxNzQ1Mjg0NTYwLCJpc3MiOiJhcGkua3JvZ2VyLmNvbSIsInN1YiI6IjJmYjJkMWNiLWY1OTUtNTM0ZC05NDJmLTE0MjExOTFhNWNjZiIsInNjb3BlIjoicHJvZHVjdC5jb21wYWN0IiwiYXV0aEF0IjoxNzQ1Mjg0NTY1MzI3MzA5NjAwLCJhenAiOiJncm9jZXJ5c2NvdXQtMjQzMjYxMjQzMDM0MjQ0YzZhNzA0NTYzNmI0YzQyNjY2YzMwNmQ0NDY1NTk3ODU5NDU3NjQxNDY3NTU0NzQ2NzMzMzY1NDMzNDI0ZTRiNjg2ZjQ3Nzc2MTRlNzk0YTUzNjU1NjYyNzU2YzcwNzI2MjUwNTQ0NDc5NzA4OTIzMjYzNjE4NjMzMzM5NSJ9.MeS1EeMqsnPhYMl9XIc8TsIcWnLkEaujRzA_Q52LTBpaKv_BQmu77gSHxRONK9xYIzjislN8LO0tfBqj5stcDWw_g3wIEByre41wAknQMcFOAK8nbO4uDH2sh6kgQ_4E_kPkbDG6bNy9_o0sLhVwHcJCC2UJYBNquvv3pu6KS8AgTK6srtkW3AOJywVn7hR2VaRYLaLvc-d4qgBORmiod04_12WV7ThkkUYdwx3wKdsMtP53pRigbG2Pj3qSbYjk-bdFj5xKP0RQ-qYM7rRGinnrSrD9AC321w0LQjc0BYlbjZt1nCQIDpdTlIPLII8yU4q6AyKofLdhqgcXc1GN8w';
const LOCATION_ID = '01400943';


async function getToken() {

  const username = "groceryscout-243261243034244c6a7045636b4c42666c306d4465597859457641467554746733365433424e4b686f4777614e794a53655662756c707262505444797089232636186333395"
  const password = "SvKxhDBNOy6ytp8eHSrnU1aI6WuMR3COXh12Z4er"
  const basicAuth = Buffer.from(`${username}:${password}`).toString('base64');
  

  try{
    console.log("Making request for the token");
    const response = await fetch("https://api.kroger.com/v1/connect/oauth2/token", {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${basicAuth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      // Use URLSearchParams to properly format the body
      body: new URLSearchParams({
        'grant_type': 'client_credentials',
        'scope': 'product.compact'
      }).toString()
    });
    console.log("request for token finished");
    const data = await response.json();
    console.log('Token response:', data);
    return data.access_token;

  } catch(err){
    console.log(err);
    return null;
  }

}

const testing = async (req, res) => {
  const urlParams = new URLSearchParams(req.url.split('?')[1]); // Extract query parameters from the request URL
  const SEARCH_TERM = urlParams.get('searchTerm'); // Get the search term from the query string

  if (!SEARCH_TERM) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: 'Search term is required.' }));
    return;
  }

  const url = `https://api.kroger.com/v1/products?filter.term=${SEARCH_TERM}&filter.locationId=${LOCATION_ID}`;
  const new_token = await getToken();

  if(new_token === null){
    console.log("Token generation failed");
    new_token = TOKEN
  }

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${new_token}`
      }
    });

    if (!response.ok) throw new Error(`HTTP ${response.status} - ${response.statusText}`);

    const data = await response.json();
    const items = data.data;
    console.log(items.length);

    if (!items || items.length === 0) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify([])); // Return an empty array if no items are found
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
