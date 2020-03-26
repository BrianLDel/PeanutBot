console.log('The bot is Starting...');
require('dotenv').config();

const frases = require('./phrases.js');
const TB = require('quick-twitter-bot');
const _ = require('lodash');

var backupFrases = [];
var misFrases = frases;

function randomPhrase(phrases){
    return phrases[Math.floor(Math.random() * phrases.length)];
}


function tweetPhrase() {
    var frase = randomPhrase(misFrases);
    if(misFrases.length > 1){
        TB.newTweet(frase);
        backupFrases.push(frase);
        _.pull(misFrases,frase);
    }else{
        TB.newTweet(frase);
        misFrases = _.union(backupFrases, misFrases);
        backupFrases = [];
    }
}



setInterval(function () {
    tweetPhrase();
},14400000);
