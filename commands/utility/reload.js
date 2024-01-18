const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reload')
		.setDescription('명령어 새로고침')
		.addStringOption(option => // 옵션들
			option.setName('명령어') // 옵션이름
				.setDescription('새로고침할 명령어') // 옵션 설명
				.setRequired(true)), // 필수여부
	async execute(interaction) {
		const commandName = interaction.options.getString('command', true).toLowerCase();
		const command = interaction.client.commands.get(commandName);

		if (!command) {
			return interaction.reply(`해당 명령어(**${commandName}**)는 존재하지 않는 명령어입니다.`);
		}

        delete require.cache[require.resolve(`./${command.data.name}.js`)];

        try {
            interaction.client.commands.delete(command.data.name);
            const newCommand = require(`./${command.data.name}.js`);
            interaction.client.commands.set(newCommand.data.name, newCommand);
            await interaction.reply(`**${newCommand.data.name}** 명령어가 새로고침 되었습니다.`);
        } catch (error) {
            console.error(error);
            await interaction.reply(`${command.data.name}명령어를 새로고침 하는 중 오류가 발생했습니다. \n\`${error.message}\``);
        }
	},
};