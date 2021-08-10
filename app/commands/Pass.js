const dataPath = "./app/assets/pass.json";
const configPath = './app/config/general.json';
const { Markup, session, Scenes: { WizardScene, Stage } } = require('telegraf');
const fs = require("fs");
const Fuse = require('fuse.js')

function getConfig() {	
	const jsonData = fs.readFileSync(configPath)
	const dataParse = JSON.parse(jsonData)
	return dataParse
}

/**
 * Reading all data
 * @returns 
 */
function readFile() {
	const jsonData = fs.readFileSync(dataPath)
	const dataParse = JSON.parse(jsonData)
	return dataParse
}


/**
 * Write data
 * @param data 
 */
function writeFile(data) {
	const stringifyData = JSON.stringify(data)
	fs.writeFileSync(dataPath, stringifyData)
}

/**
 * chunk array with method slice
 * @returns 
 */
function chunk(arr, chunk) {
	const res = []
	for (let i = 0; i < arr.length; i += chunk) {
		const chunkRes = arr.slice(i, i + chunk)
		res.push(chunkRes)
	}
	return res;
}

/**
 * store data
 * return writeFile()
 */
function storeData(title, username, email, password) {
	var dataAll = readFile()

	const arrID = dataAll.map(item => {
		return item.id
	})
	const maxId = Math.max(...arrID)
	const currentId = maxId + 1

	const post = {
		"id": currentId,
		"title": title,
		"username": username,
		"email": email,
		"password": password
	}
	dataAll.push(post)
	writeFile(dataAll)
}

function listData(ctx, type) {
	const data = readFile()
	const dataMap = data.map(item => {
		return Markup.button.callback(item.title, type+item.id)
	})
	return ctx.reply('Semua password yang tersimpan', {
		parse_mode: 'HTML',
		...Markup.inlineKeyboard(
			chunk(dataMap, getConfig().chunk)
		)
	})
}
function showData(input, ctx) {
	const data = readFile()
	const options = {
		distance: 0,
		keys:['id']
	}
	const fuse = new Fuse(data, options)
	const result = fuse.search(input)
	ctx.editMessageText(`
	<b>${result[0].item.title}</b> :
	<b>username</b> : ${result[0].item.username}
	<b>email</b> : ${result[0].item.email}
	<b>password</b> : ${result[0].item.password}
	`, {parse_mode:'HTML'})
}

/**
 * @returns
 */
function Pass(bot) {
	// command list
	bot.command('list', (ctx) => {
		listData(ctx, 'lihat')
	})

	// command create
	var title, username, email, password

	const exit_keyboard = Markup.keyboard(['Batalkan']).oneTime().resize()
	const remove_keyboard = Markup.removeKeyboard()
	const tambahScene = new WizardScene('tambahScene',
		// step 2
		async (ctx) => {
			title = ctx.message.text
			await ctx.reply('Masukan Username : ', exit_keyboard)
			return ctx.wizard.next()
		},
		// step 3
		async (ctx) => {
			username = ctx.message.text
			await ctx.reply('Masukan Email : ', exit_keyboard)
			return ctx.wizard.next()
		},
		// step 4
		async (ctx) => {
			email = ctx.message.text
			await ctx.reply('Masukan Password : ', exit_keyboard)
			return ctx.wizard.next()
		},
		// step 5
		async (ctx) => {
			password = ctx.message.text
			storeData(title, username, email, password)
			await ctx.replyWithHTML('<b>Akun berhasil ditambah</b>',remove_keyboard)
			return ctx.scene.leave()
		}
	)
	// step 1
	tambahScene.enter(ctx => ctx.reply('Masukan Title :', exit_keyboard))

	const stage = new Stage([tambahScene])
	stage.hears('Batalkan', ctx => {
		ctx.reply('Tambah akun dibatalkan', remove_keyboard)
		ctx.scene.leave()
	})

	bot.use(session(), stage.middleware())
	bot.command('tambah', (ctx) => {
		ctx.scene.enter('tambahScene')
	})

	// command show
	bot.action(/lihat(\d+)/, (ctx) => {
		const input = ctx.match.input.match(/\d+/)[0]
		showData(input, ctx)
	})

	// command edit
	bot.command('hapus', (ctx)=>{
		listData(ctx,'hapus')
	})

	// confim delete
	bot.action(/(hapus)(\d+)/, (ctx)=>{
		const input = ctx.match.input.match(/\d+/)[0]
		showData(input, ctx)
		ctx.reply('Yakin ingin hapus ?', 
		Markup.inlineKeyboard([
			Markup.button.callback('Batal', 'batal'+input),
			Markup.button.callback('Iya', 'iya'+input)
		])
		)
	})

	// aciton delete
	bot.action(/(iya|batal)(\d+)/, (ctx)=>{
		const input = ctx.match
		if(input[1] == 'iya'){
			var data = readFile()
			data = data.filter((item)=>{
				return item.id != input[2]
			})
			writeFile(data)
			ctx.editMessageText('Berhasil dihapus')
		}else{
			ctx.editMessageText('Batal dihapus')
		}
	})

}

module.exports = Pass;
