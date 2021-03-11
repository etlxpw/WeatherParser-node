/*jshint esversion: 6 */

const express = require('express');
const fetch = require('node-fetch');
const chalk = require('chalk');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;
const app = express();
const port = 3000;

// API key
const apiKey = ''; //ADD YOUR OWN KEY HERE!
const city = argv.city;
const unit = 'metric';
const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

//Temp base Color Setter
function setTemp(temp) {
    if(temp >= 40) console.log(chalk.hex('#4EB195').bold(temp) + "°C");
    else if(temp >=25) console.log(chalk.hex('#B83567').bold(temp)+ "°C");
    else if(temp >= 15) console.log(chalk.hex('#E2CF3A').bold(temp)+ "°C");
    else if(temp >= 0) console.log(chalk.hex('#4EB195').bold(temp)+ "°C");
    else if(temp >= -15) console.log(chalk.hex('#291E6A').bold(temp)+ "°C");
    else if(temp >= -25) console.log(chalk.hex('#8F118F').bold(temp)+ "°C");
    else console.log(chalk.hex('#F3A5F3').bold(temp));
}


fetch(url).then(res => res.json()).then((body) => {
    const weatherData = body;
    const currTemp = weatherData.main.temp;
    const descArray = weatherData.weather[0];
    const desc = descArray.main;
    setTemp(currTemp);
    console.log(chalk.blue(desc));
});