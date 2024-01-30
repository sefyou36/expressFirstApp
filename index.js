const express = require('express');
const fs = require('fs');
const replaceTemplate = require('./modules/replaceTemplate');
const app = express();
const port = 4600;

const templateOverview = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8');
const templateCard = fs.readFileSync(`${__dirname}/templates/card.html`, 'utf-8');
const templateProduct = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8');
const data = fs.readFileSync('./dev-data/data.json', 'utf-8');
const dataObjc = JSON.parse(data);

app.get('/', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html',
    });

    const cardHtml = dataObjc.map(item => replaceTemplate(templateCard, item)).join('');
    const output = templateOverview.replace('{%CARD%}', cardHtml);

    res.end(output);
});


app.get('/product/id=:id', (req, res) => {
    const  id  = req.params;
    console.log(id);
    const myProduct = dataObjc[id.id];
    console.log(myProduct)

    // res.writeHead(200, {
    //     'Content-Type': 'application/json',
    // });

    const output = replaceTemplate(templateProduct, myProduct);
    res.send(output);
});

app.use((req, res) => {
    res.status(404).send('<h1>Page not Found!!</h1>');
});


app.listen(port, () => {
    console.log(`Server is listening on port: ${port}!`);
});
