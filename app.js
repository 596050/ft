const {
  buildErrorMessage,
  pageNavigation
} = require('./public/javascript/appHelpers/app.helpers');
// Setup
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Create routes

// Use the public folder as the starting point for src tags in our views

app.use(express.static(path.join(__dirname, 'public')));

// Set extension for view files as .hbs

app.engine('.hbs', exphbs({ extname: '.hbs' }));

// Set view engine to be Handlebars

app.set('view engine', '.hbs');

// Set the path directory for view templates

app.set('views', __dirname + '/public/views');

app.get('/', function(req, res) {
  res.render('home.hbs');
});

app.get('/search', async (req, res) => {
  let content;
  const query = req.query.queryString;
  const page = +req.query.page || 1;
  const pageSize = 5;

  try {
    content = await axios.get(
      `http://newsapi.org/v2/everything?q=${query}&pageSize=${pageSize}&page=${page}&apiKey=${process.env.NEWS_API_KEY}`
    );
  } catch (e) {
    console.warn('e', e.response.status, e.response.statusText);
    res.render('error.hbs', {
      errorMessage: buildErrorMessage(e.response.status)
    });
    return;
  }

  const { nextPage, previousPage, notFirstPage } = pageNavigation(
    page,
    content
  );

  res.render('home.hbs', {
    content: content.data.articles,
    nextPage,
    previousPage,
    notFirstPage,
    query
  });
});

// Start server

app.use(function(req, res) {
  res.status(404).render('error.hbs', { errorMessage: buildErrorMessage(404) });
});

app.listen(process.env.PORT);

console.log(
  `App is running, server listening on port http://localhost:${process.env.PORT}/`
);
