console.log('The bot is Starting...');
require('dotenv').config();


const frases = require('./phrases.js');
//const TB = require('quick-twitter-bot');
const _ = require('lodash');

const app = require('./app');


var backupFrases = [];
var misFrases = frases;

function randomPhrase(phrases){
    return phrases[Math.floor(Math.random() * phrases.length)];
}


function tweetPhrase() {
    var frase = randomPhrase(misFrases);
    if(misFrases.length > 1){
        console.log(frase);
        //TB.newTweet(frase);
        backupFrases.push(frase);
        _.pull(misFrases,frase);
    }else{
        console.log(frase);
        //TB.newTweet(frase);
        misFrases = _.union(backupFrases, misFrases);
        backupFrases = [];
    }
}


setInterval(function () {
    tweetPhrase();
    console.log(misFrases);
},4000);


app.listen(app.get('port'));
console.log(`Server on Port ${app.get('port')}`);