var Bot = require('slackbots');
var dictionary = require('./public.dictionary');

var settings = {
    token: process.env.SLACK_TOKEN,
    name: 'butylka'
};
const bot = new Bot(settings);
const params = {
    icon_emoji: ':butylka:',
    link_names: 1
};

bot.on('start', function () {
    console.log('утро доброе!');
    // bot.postMessageToChannel('general', 'го бухать!', params);
    // bot.postMessageToUser('deus', 'ПОЦ!', params);
    // bot.postMessage('D85NY8D7D', 'ты ПОЦ!', params)
    // bot.postMessageToChannel('roomster', '@deus ПОЦ!', params);
    // bot.postMessageToGroup('some-private-group', 'hello group chat!');
});

bot.on('message', async function (data) {
    // all ingoing events https://api.slack.com/rtm
    if (data.type === 'hello' ||
        data.type !== 'message' ||
        data.subtype ||
        data.username === bot.name)
        return;
    const text = data.text.toLowerCase();
    let find = Object.keys(dictionary).find(k =>
        dictionary[k].some(i => {
            const reg = new RegExp(`(^\|[ \n\r\t.,'\"\+!?-]+)(${i})([ \n\r\t.,'\"\+!?-]+\|$)`, "gu");
            return text.search(reg) !== -1;
        })
    );
    if (find) {
        try {
            const {
                members
            } = await bot.getUsers();
            const user = members.find(u => u.id === data.user);
            if (user) find = '@' + user.name + ' ' + find;
        } catch (e) {
            console.error('ERROR: ', e)
        }
        bot.postMessage(data.channel, find, params);
    }
});