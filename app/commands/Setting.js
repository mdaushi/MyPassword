const fs = require('fs');
const  configPath = './app/config/general.json';

function getConfig() {	
	const jsonData = fs.readFileSync(configPath)
	const dataParse = JSON.parse(jsonData)
	return dataParse
}

function __construct() {
	this.config = getConfig();
	this.isAdmin = this.config.isAdmin;
	this.chunk = this.config.chunk;
}

module.exports = bot =>{
	bot.command('paginate', (ctx)=>{
		ctx.reply('Masukan nilai :')
		bot.on('message', (ctx)=>{
			if(ctx.message.text.match(/^[0-9]/)){
				this.chunk = parseInt(ctx.message.text)
				fs.writeFileSync(configPath, JSON.stringify(this))
				return ctx.reply('Paginate diset ke '+this.chunk)
			}else{
				return ctx.reply('set paginate dibatalkan')
			}
		})
	})
}