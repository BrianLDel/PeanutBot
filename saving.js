const fs = require('fs');


function writeFileTweets(path, data) {
    try {
        const jsonString = JSON.stringify(data);
        fs.writeFileSync(path, jsonString);
        console.log('Escritura Correcta.')
    } catch (err) {
        console.log(err);
    }
}

function readFileTweets(path) {
    try {
        const jsonString = fs.readFileSync(path);
        const tweet = JSON.parse(jsonString);
        console.log('Lectura Correcta.')
        return tweet;
    } catch (err) {
        console.log(err);
        return
    }
}

module.exports= {writeFileTweets, readFileTweets}