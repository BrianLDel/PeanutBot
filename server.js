console.log('The bot is Starting...');
require('dotenv').config();


const frases = require('./phrases.js');
const TB = require('quick-twitter-bot');
const Twit = require('twit');
const _ = require('lodash');
const iHappy = require('./images/happy/happy');
const iArrogant = require('./images/arrogant/arrogant');
const iKe = require('./images/ke/ke');
const iSurpraise = require('./images/surpraise/surpraise');
const iSuspicious = require('./images/suspicious/suspicious');
const { randomHappyDir, randomArrogantDir, randomSurpraiseDir, randomSuspiciousDir, randomKeDir, replyATweetWithMedia } = require('./replyWithMedia');
const app = require('./app');


const T = new Twit({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
});


let backupFrases = [];
let misFrases = frases;

function randomPhrase(phrases){
    return phrases[Math.floor(Math.random() * phrases.length)];
}

function tweetPhrase() {
    const frase = randomPhrase(misFrases);
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

let tweetsAlreadyRes = [];
let lastTweet={};

async function replyTweet() {
    let tweetsRecieved = [];
    await TB.mentionsTimeLine()
        .then(res=>tweetsRecieved = res);
        
    let actualList = _.filter(tweetsRecieved,(e)=>{return !_.includes(_.map(tweetsAlreadyRes,'id_str'),e.id_str)});
    if(actualList.length!==0){  
        const tweetToRespond = _.last(actualList);
        const username = tweetToRespond.user.screen_name;
        const id = tweetToRespond.id_str;
        const text = tweetToRespond.text;
        if(text.includes('Hola')||text.includes('Hi')||text.includes('hola')||text.includes('hi')){
            const dirImage = randomHappyDir(iHappy);
            if(tweetToRespond.id_str !== lastTweet.id_str)
            replyATweetWithMedia(dirImage,username,'Hakuna Matata',id);

        }else if(text.includes('quiero')||text.includes('gusta')||text.includes('jaja')){
            const dirImage = randomKeDir(iKe);
            if(tweetToRespond.id_str !== lastTweet.id_str)
            replyATweetWithMedia(dirImage,username,'WAAAT',id);
            
        }else if(text.includes('perro')||text.includes('lindo')||text.includes('perrito')){
            const dirImage = randomArrogantDir(iArrogant);
            if(tweetToRespond.id_str !== lastTweet.id_str)
            replyATweetWithMedia(dirImage,username,'That´s me',id);
    
        }else if(text.includes('gane')||text.includes('miedo')||text.includes('coronavirus')){
            const dirImage = randomSurpraiseDir(iSurpraise);
            if(tweetToRespond.id_str !== lastTweet.id_str)
            replyATweetWithMedia(dirImage,username,'didn´t expect it',id);
        
        }else if(text.includes('ojala')||text.includes('espero')||text.includes('ojalá')){
            const dirImage = randomSuspiciousDir(iSuspicious);
            if(tweetToRespond.id_str !== lastTweet.id_str)
            replyATweetWithMedia(dirImage,username,'Hummm you sure? ',id);
        
        }else{
            const dirImage = randomSuspiciousDir(iSuspicious);
            if(tweetToRespond.id_str !== lastTweet.id_str)
            replyATweetWithMedia(dirImage,username,'Hummm you sure? ',id);
        }

        lastTweet = tweetToRespond;
        tweetsAlreadyRes.push(tweetToRespond);

        if(tweetsAlreadyRes.length > 41){
            tweetsAlreadyRes = _.take(tweetsAlreadyRes,22);
        }
    }else{
        console.log('No hay menciones por responder.');
    }
}
let lastBl={};
let actualBl;

async function tweetTo(user) {
    let frase = randomPhrase(misFrases);
    await TB.userTimeLine({screen_name: user})
        .then(response=> actualBl = _.head(response));
        let id = actualBl.id_str;
        
    if (!actualBl.in_reply_to_screen_name) {
        if(lastBl.id_str !== actualBl.id_str){
            T.post('statuses/update',{status: `@${user} ${frase}`,in_reply_to_status_id: id},function (err, reply) {
                if(err) console.log(err.message);
                else console.log('Tweeted: ' + reply.text);
            });
            lastBl = actualBl;
            actualBl={};
        }else{console.log('Ya respondimos a ese tweet.')}
    }else{console.log('No es un tweet propio.')}
}


setInterval(function () {
    replyTweet().then(()=>{console.log('Task successful');
    });
},180000);
    
setInterval(function () {
    tweetPhrase();
},14400000);
        

app.listen(app.get('port'));
console.log(`Server on Port ${app.get('port')}`);
