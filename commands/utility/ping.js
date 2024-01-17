const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('탁구를 칩니다'),
	async execute(interaction) {
		await interaction.reply('퐁!');
	},
};