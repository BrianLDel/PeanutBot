require('dotenv').config();

const fs = require('fs');
const Twit = require('twit');

const T = new Twit({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
});


function randomHappyDir(images) {
    console.log('Picking an image...');
    const random_image = images[Math.floor(Math.random() * images.length)];
    return `./images/happy/${random_image.file}`;
}
function randomArrogantDir(images) {
    console.log('Picking an image...');
    const random_image = images[Math.floor(Math.random() * images.length)];
    return `./images/arrogant/${random_image.file}`;
}
function randomKeDir(images) {
    console.log('Picking an image...');
    const random_image = images[Math.floor(Math.random() * images.length)];
    return `./images/ke/${random_image.file}`;
}
function randomSurpraiseDir(images) {
    console.log('Picking an image...');
    const random_image = images[Math.floor(Math.random() * images.length)];
    return `./images/surpraise/${random_image.file}`;
}
function randomSuspiciousDir(images) {
    console.log('Picking an image...');
    const random_image = images[Math.floor(Math.random() * images.length)];
    return `./images/suspicious/${random_image.file}`;
}

function replyATweetWithMedia(imageDir,userName,tweetText,id) {
    const b64content = fs.readFileSync(imageDir, { encoding: 'base64' });

    T.post('media/upload', { media_data: b64content }, function (err, data, response) {
        const mediaIdStr = data.media_id_string;
        const meta_params = { media_id: mediaIdStr };

        T.post('media/metadata/create', meta_params, function (err, data, response) {
            if (!err) {
            const params = { status: `@${userName} ${tweetText}.`, media_ids: [mediaIdStr], in_reply_to_status_id: id };

            T.post('statuses/update', params, function (err, data, response) {
                console.log('Tweeted: ' + params.status);
                })
            }
        })
    })
}

module.exports = {randomHappyDir, randomArrogantDir, randomKeDir, randomSurpraiseDir, randomSuspiciousDir, replyATweetWithMedia};