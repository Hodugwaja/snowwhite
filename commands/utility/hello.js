const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hello')
		.setDescription('인사를 하다'),
	async execute(interaction) {
		await interaction.reply('안녕!');
	},
};