//server
const express = require('express');
const app = express();

//puerto
const PORT = 3000;

//faker para las coordenadas
const faker = require('faker');

//md5-base64
const md5Base64 = require('md5-base64');

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

/*const data = JSON.stringify({
  loginCode: '98173',
  reportDate: date,
  reportType: '2',
  latitude: randomLatitud,
  longitude: randomLongitud,
  gpsDop: 1.0,
  text: 'DAVID LEIVA',
  textLabel: 'TAG'
});
console.log(data);*/
const timestamp = moment().unix();
const hash = md5Base64(process.env.application + process.env.secretKey + timestamp);

console.log(timestamp);
console.log(hash);
console.log(hash.length);

var datos = 'SWSAuth application="' + process.env.application + '",signature="' + hash + '",timestamp="' + moment().unix();


//funcion
function gps() {
  axios.put(url, {
    loginCode: '98173',
    reportDate: date,
    reportType: '2',
    latitude: randomLatitud,
    longitude: randomLongitud,
    gpsDop: 1.0,
    text: 'DAVID LEIVA',
    textLabel: 'TAG'
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': datos
    }
  })
    .then(res => {
      //console.log(`statusCode: ${res.status}`)
      //console.log(res)
      if (res.status == 200) {
        console.log(`statusCode ok: ${res.status}`);
        //setInterval(gps, 60000);
      } else {
        console.log(`statusCode en else: ${res.status}`);
        //setInterval(enviar, 10000);
      }
    })
    .catch(error => {
      console.error(error)
    });
}

//setInterval(gps,60000);

//gps();


var comienzo = new Date().getMinutes();
console.log(comienzo);
setInterval(function () {
  if ((new Date().getMinutes() - comienzo) < 10) {
    console.log('menor a 10m')
    gps();
    
  } else {
    return 'finalizado';
  }
}, 60000);

app.get('/', function (req, res) {
  res.send('Hola');
});




app.listen(PORT, () => {
  console.log("Servidor funcionando en el puerto " + PORT);
});