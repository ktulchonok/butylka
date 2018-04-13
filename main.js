var Bot = require('slackbots');

// create a bot
var settings = {
    token: process.env.SLACK_TOKEN,
    name: 'butylka'
};
const bot = new Bot(settings);
const params = {
    icon_emoji: ':butylka:',
    link_names: 1
};
const lib = {
    'и мне возьмите': ['пиво', 'сиги' , 'cиги'],
    'поехали': ['караоке'],
    'о, дырки': ['бар', 'тру', 'тихий'],
    'садись, братишка': ['бутылка'],
    'в ногах правды нет': ['на бутылку'],
    'я готова': ['бухать'],
}
bot.on('start', function() {
    bot.postMessageToChannel('general', 'я проснулся!', params);
    // bot.postMessageToUser('bulldoglord', 'я проснулся!', params);
    // bot.postMessageToGroup('some-private-group', 'hello group chat!');
});

bot.on('message', function(data) {
    // all ingoing events https://api.slack.com/rtm
    if (data.type !== 'message') return;
    const text = data.text.toLowerCase();

    const find = Object.keys(lib).find(k => lib[k].some(i => text.includes(i)));
    if (find && data.subtype !== 'message_deleted') 
        bot.postMessage(data.channel, find, params);
});