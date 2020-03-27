console.log('The bot is Starting...');
require('dotenv').config();


const frases = require('./phrases.js');
const TB = require('quick-twitter-bot');
const _ = require('lodash');
const iHappy = require('./images/happy/happy');
const iArrogant = require('./images/arrogant/arrogant');
const iKe = require('./images/ke/ke');
const iSurpraise = require('./images/surpraise/surpraise');
const iSuspicious = require('./images/suspicious/suspicious');
const { randomHappyDir, randomArrogantDir, randomSurpraiseDir, randomSuspiciousDir, randomKeDir } = require('./replyWithMedia');
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
        TB.newTweet(frase);
        backupFrases.push(frase);
        _.pull(misFrases,frase);
    }else{
        console.log(frase);
        TB.newTweet(frase);
        misFrases = _.union(backupFrases, misFrases);
        backupFrases = [];
    }
}

var tweetsAlreadyRes = [];


async function replyTweet() {
    let tweetsRecieved = [];
    await TB.mentionsTimeLine()
        .then(res=>tweetsRecieved = res);
        
    let actualList = _.filter(tweetsRecieved,(e)=>{return !_.includes(_.map(tweetsAlreadyRes,'id_str'),e.id_str)});
    if(actualList.length!==0){  
        var tweetToRespond = _.last(actualList);
        var username = tweetToRespond.user.screen_name;
        var text = tweetToRespond.text;
        if(text.includes('Hola')||text.includes('Hi')||text.includes('hola')||text.includes('hi')){
            var dirImage = randomHappyDir(iHappy);
            await TB.newTweetWithMedia(`@${username} hakuna matata.`,dirImage);
        
        }else if(text.includes('quiero')||text.includes('gusta')||text.includes('jaja')){
            var dirImage = randomKeDir(iKe);
            await TB.newTweetWithMedia(`@${username} WAAAT `,dirImage);
            
        }else if(text.includes('perro')||text.includes('lindo')||text.includes('perrito')){
            var dirImage = randomArrogantDir(iArrogant);
            await TB.newTweetWithMedia(`@${username} Thats me.`,dirImage);
    
        }else if(text.includes('gane')||text.includes('miedo')||text.includes('coronavirus')){
            var dirImage = randomSurpraiseDir(iSurpraise);
            await TB.newTweetWithMedia(`@${username} didn't expect that`,dirImage);
        
        }else if(text.includes('ojala')||text.includes('espero')||text.includes('ojalá')){
            var dirImage = randomSuspiciousDir(iSuspicious);
            await TB.newTweetWithMedia(`@${username} hummm  you sure? `,dirImage);
        
        }
        tweetsAlreadyRes.push(tweetToRespond);
        console.log('eL PUSH LO HACE.')
        if(tweetsAlreadyRes.length > 41){
        tweetsAlreadyRes = _.take(tweetsAlreadyRes,22);
        }
    }else{
        console.log('No hay menciones por responder.');
    }
}
setInterval(function () {
    replyTweet().then(()=>{console.log('Task successful');
});
},180000);

setInterval(function () {
    tweetPhrase();
    console.log(misFrases);
},14400000);


app.listen(app.get('port'));
console.log(`Server on Port ${app.get('port')}`);
