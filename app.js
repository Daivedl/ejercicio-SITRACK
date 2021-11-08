//server
const express = require('express');
const app = express();
//puerto
const PORT = 3000;
//faker para las coordenadas
const faker = require('faker');
//md5-base64
const md5Base64 = require('md5-base64');
//https
const https = require('https');
//formato de fecha "yyyy-MM-ddTHH:mm:ssZ"
const moment = require('moment');
require('dotenv').config();
//axios
const axios = require('axios');



const url = 'https://test-externalrgw.ar.sitrack.com/frame';

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


var randomLatitud = faker.address.latitude();
var randomLongitud = faker.address.longitude();
console.log(randomLatitud, randomLongitud);


var date = moment.utc(date).format('YYYY-MM-DDThh:mm:ssZ');
console.log(date);


const data = JSON.stringify({
    loginCode: '98173',
    reportDate: date,
    reportType: '2',
    latitude: randomLatitud,
    longitude: randomLongitud,
    gpsDop: 1.0,
    text: 'DAVID LEIVA',
    textLabel: 'TAG'
});
console.log(data);
const timestamp = moment().unix();
const hash = md5Base64(process.env.application + process.env.secretKey + timestamp);

console.log(timestamp);
console.log(hash);
console.log(hash.length);


//funcion
axios.put(url, {data})
  .then(res => {
    console.log(`statusCode: ${res.status}`)
    //console.log(res)
  })
  .catch(error => {
    console.error(error)
  });

app.get('/', function (req, res) {
    res.send('Hola');
});




app.listen(PORT, () => {
    console.log("Servidor funcionando en el puerto " + PORT);
});