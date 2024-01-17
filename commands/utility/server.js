const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('서버정보를 가져옵니다'),
	async execute(interaction) {
		// interaction.guild is the object representing the Guild in which the command was run
		await interaction.reply(`현재 입력하신 서버는 ${interaction.guild.name}(${interaction.guild.id})에 있습니다\n또한 이 서버는 ${interaction.guild.memberCount}명이 있습니다`);
	},
};