const  {Telegraf}  = require('telegraf')
const Auth = require('./app/middleware/Auth')

const bot = new Telegraf(process.env.BOT_TOKEN)

// middleware auth
bot.use( async(ctx, next)=>{
  if(!(Auth(ctx.chat.id))){
    return ctx.reply('Tidak punya akses ke bot ini')
  }
  await next()
})

// command here 
require('./app/commands/Help')(bot);
require('./app/commands/Pass')(bot);
require('./app/commands/Setting')(bot);

// webhook
bot.launch({
  webhook: {
    domain: process.env.BASE_URL,
    port: process.env.PORT
  }
})