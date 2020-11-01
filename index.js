const express = require('express');
const LimitingMiddleware = require('limiting-middleware');
const { randomHalloweenJoke, randomHalloweenFact, randomHalloweenImage, randomHalloweenMovie } = require('./handler');
const cors = require('cors')


const app = express();

app.use(new LimitingMiddleware().limitByIp());

app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', (req, res) => {
  res.send('Add /halloween_joke, /halloween_fact, /halloween_movie, or /halloween_image to the end of the URL to get your data');
});

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.get('/halloween_fact', (req, res) => {
  res.json(randomHalloweenFact());
});

app.get("/countries/:country", async function(req, res) {
    let countries = await db.fetch("countries");
    let country = countries.find(
        e => {
              if(e.country.toLowerCase().localeCompare(req.params.country.toLowerCase()) === 0)
              {
              return true;
            }
        });
    if (!country) {
      res.send("Country not found");
      return;
    }
    res.send(country);
  });



app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    type: 'error', message: err.message
  });
});

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => console.log(`listening on ${PORT}`));