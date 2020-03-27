require('dotenv').config();


function randomHappyDir(images) {
    console.log('Picking an image...');
    var random_image = images[Math.floor(Math.random() * images.length)];
    return `./images/happy/${random_image.file}`;
}
function randomArrogantDir(images) {
    console.log('Picking an image...');
    var random_image = images[Math.floor(Math.random() * images.length)];
    return `./images/arrogant/${random_image.file}`;
}
function randomKeDir(images) {
    console.log('Picking an image...');
    var random_image = images[Math.floor(Math.random() * images.length)];
    return `./images/ke/${random_image.file}`;
}
function randomSurpraiseDir(images) {
    console.log('Picking an image...');
    var random_image = images[Math.floor(Math.random() * images.length)];
    return `./images/surpraise/${random_image.file}`;
}
function randomSuspiciousDir(images) {
    console.log('Picking an image...');
    var random_image = images[Math.floor(Math.random() * images.length)];
    return `./images/suspicious/${random_image.file}`;
}

module.exports = {randomHappyDir, randomArrogantDir, randomKeDir, randomSurpraiseDir, randomSuspiciousDir};