const express = require('express');
const { Client } = require('equatorial-energia');
require('dotenv').config()
const app = express();

const client = new Client(process.env.USERNAME_CPF, process.env.BIRHTDAY, {
  state: 'PA',
});
app.get('/userinfo', (req, res) => {
  client
    .loginWithBirhtday()
    .then((structure) => {
      res.json(structure._expire);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error logging in with birthday');
    });
});

app.get('/history/:contractId', (req, res) => {
  client
    .loginWithBirhtday()
    .then(() => {
      client
        .consumpitonHistory(req.params.contractId)
        .then((history) => {
          res.json(history);
        })
        .catch((error) => {
          res.status(500).json({ error: error.message });
        });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});
app.get('/open/:contractId', (req, res) => {
  client
    .loginWithBirhtday()
    .then((structure) => {
      client
        .openInvoices(req.params.contractId, structure.getContractsId()[0])
        .then((openInvoices) => {
          res.json(openInvoices);
        })
        .catch((error) => {
          res.status(500).json({ error: error.message });
        });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

app.listen(3000, () => {
  console.log('API listening on port 3000');
});

// 003015335563