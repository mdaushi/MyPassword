const configPath = './app/config/general.json'
const fs = require('fs')

function getConfig() {	
	const jsonData = fs.readFileSync(configPath)
	const dataParse = JSON.parse(jsonData)
	return dataParse
}

function authenticator(userId) {
	const config = getConfig()
	if(!config.isAdmin){
		config.isAdmin = userId
		fs.writeFileSync(configPath, JSON.stringify(config))
	}
	if(config.isAdmin == userId){
		return true
	}
	return false
}

module.exports = authenticator;