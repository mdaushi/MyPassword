const  {Telegraf}  = require('telegraf')

const bot = new Telegraf(process.env.BOT_TOKEN)

// command here
require('./app/commands/Help')(bot);
require('./app/commands/Pass')(bot);

// webhook
bot.launch({
  webhook: {
    domain: process.env.BASE_URL,
    port: process.env.PORT
  }
})