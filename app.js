//server
const express = require('express');
const app = express();
//puerto
const PORT = 3000;
//faker para las coordenadas
const faker = require('faker');
//md5
const md5 = require('md5');
console.log(md5('test'));
//https
const https = require('https');
//formato de fecha "yyyy-MM-ddTHH:mm:ssZ"
const moment = require('moment');


const url = 'https://test-externalrgw.ar.sitrack.com/frame';

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


var randomLatitud = faker.address.latitude();
var randomLongitud = faker.address.longitude();
console.log(randomLatitud, randomLongitud);

var loginCode = '98173';
var text = 'DAVID LEIVA';
var textLabel = 'TAG';
var date = moment.utc(date).format('YYYY-MM-DDThh:mm:ssZ');
console.log(date);

//funcion
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


app.get('/', function (req, res) {
    res.send('Hola');
});



app.listen(PORT, () => {
    console.log("Servidor funcionando en el puerto " + PORT);
});