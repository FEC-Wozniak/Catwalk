const express = require('express');
const path = require('path');
const axios = require('axios');
const TOKEN = require('../config').TOKEN;

const app = express();

const port = 8080;

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

/*
 example: axios.get(`/products/${id}`)
 don't forget to access data.data on your client side as well (see .then)
*/
app.get(`/products/:id`, (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${req.params.id}`, {

    headers: {
      Authorization: TOKEN
    }
  })
    .then((data) => {
      res.status(200).send(data.data);
    })
    .catch((err) => {
      console.log('ERR Axios request for product');
      res.status(402).send(err);
    });
});

app.get('/reviews/meta/:id', (req, res) => {

  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/meta?product_id=${req.params.id}`, {
    headers: {
      Authorization: TOKEN
    }
  })
    .then((data) => {
      res.status(200).send(data.data);
    })
    .catch((err) => {

      console.log('ERR getting reviews metadata');
      res.status(404).send(err);
    });
});

app.get('/reviews/:product_id/:sort/:count', (req, res) => {
  console.log('not meta');
  console.log(req.params);
  let { product_id, sort, count} = req.params;
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/?product_id=${product_id}&count=${count}&sort=${sort}`, {
    headers: {
      Authorization: TOKEN,
    },
  })
    .then((data) => {
      res.status(200).send(data.data);
    })
    .catch((err) => {
      console.log('ERR getting reviews meta data');
      res.status(404).send(err);
    });
});

app.get(`/products/:id/styles`, (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${req.params.id}/styles`, {
    headers: {
      Authorization: TOKEN
    }
  })
    .then((data) => {
      // console.log(data.data.results);
      res.status(200).send(data.data);
    })
    .catch((err) => {
      console.log('ERR getting styles');
      res.status(402).send(err);
    });
});

app.get(`/products/:id/related`, (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${req.params.id}/related`, {
    headers: {
      Authorization: TOKEN,
    },
  })
    .then((data) => {
      res.status(200).send(data.data);
    })
    .catch((err) => {
      console.log('ERR Axios request for related products');
      res.status(402).send(err);
    });
});

app.post(`/reviews`, (req, res) => {
  axios.post(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews`, req.body, {
    headers: {
      Authorization: TOKEN,
    },
  })
    .then((data) => {
      res.status(201).send(data.data);
    })
    .catch((err) => {
      console.log('ERR posting review');
      res.status(500).send(err);
    });
});

app.listen(port, () => {
  console.log('Server listening at:', port);
});

module.exports = {
  port,
};
