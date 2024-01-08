const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware para analisar dados codificados em URL
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware para analisar dados JSON no corpo da solicitação
app.use(express.json());

// Rota de API para responder com um documento JSON { name: 'firstname lastname' }
app.route('/name')
  .get((req, res) => {
    const firstName = req.query.first || 'John';
    const lastName = req.query.last || 'Doe';
    const fullName = `${firstName} ${lastName}`;
    
    res.json({ name: fullName });
  })
  .post((req, res) => {
    const firstName = req.body.first || 'John';
    const lastName = req.body.last || 'Doe';
    const fullName = `${firstName} ${lastName}`;
    
    res.json({ name: fullName });
  });

// Rota de exemplo para o servidor de eco
app.get('/:word/echo', (req, res) => {
  const word = req.params.word;
  res.json({ echo: word });
});

// Rota de exemplo para o servidor de hora atual
app.get('/now', (req, res) => {
  res.json({ time: new Date().toString() });
});

// Rota para servir o arquivo HTML da pasta 'views'
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

module.exports = app;
