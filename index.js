const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands'); // commands 폴더 내로 경로 지정
const commandFolders = fs.readdirSync(foldersPath); // 경로저장

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder); // 폴더 내의 경로 가져오기
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js')); // events폴더 내에 .js로 끝나는(확장자가 js파일)만 나오도록 필터링
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

const eventsPath = path.join(__dirname, 'events'); // events 폴더 내fh 경로 지정
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js')); // events폴더 내에 .js로 끝나는(확장자가 js파일)만 나오도록 필터링

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.login(token);